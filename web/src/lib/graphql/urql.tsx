import { Cache, cacheExchange, CacheExchangeOpts, Resolver } from '@urql/exchange-graphcache';
import router from 'next/router';
import { dedupExchange, Exchange, fetchExchange, gql, stringifyVariables } from 'urql';
import { pipe, tap } from 'wonka';
import { API_HOST } from '../../config';
import { CreateAuthMutation, CreateUserMutation, CreateVoteMutation, DeleteAuthMutation, DeletePostMutationVariables, GetAuthDocument, GetAuthQuery } from '../../types';
import { customUpdateQuery, isServer } from '../../utils';

const ErrorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('t authenticated')) {
        router.replace('/login')
      }
    })
  )
}

function cursorPagination(__typename: string): Resolver {
  return (_, fieldArgs, cache, info) => {
    const { parentKey: entity, fieldName } = info;
    const fields = cache.inspectFields(entity).filter(f => f.fieldName === fieldName);
    if (!fields.length) return undefined;

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    info.partial = !cache.resolve(entity, fieldKey)

    return fields.reduce((all, { fieldKey }) => {
      const key = cache.resolve(entity, fieldKey) as string;
      all.hasMore = cache.resolve(key, 'hasMore');
      all.items = all.items.concat(cache.resolve(key, 'items'));
      return all;
    }, { __typename, hasMore: true, items: [] } as Record<string, any>);
  }
}

function invalidatePosts(cache: Cache) {
  const fields = cache.inspectFields('Query').filter(f => f.fieldName === 'getPosts');
  fields.forEach(f => {
    cache.invalidate('Query', 'getPosts', f.arguments || {});
  })
}

const cachePolicy: CacheExchangeOpts = {
  resolvers: {
    Query: {
      getPosts: cursorPagination("PostsResponseDto")
    }
  },
  updates: {
    Mutation: {
      deletePost: (_, args, cache) => {
        cache.invalidate({
          __typename: 'Post',
          id: (args as DeletePostMutationVariables).id
        })
      },
      createPost: (_, __, cache) => {
        invalidatePosts(cache)
      },
      createVote: ({ createVote }: CreateVoteMutation, { postId }, cache) => {
        if (!createVote.errors) {
          cache.writeFragment(gql`fragment _ on Post { rating }`, { id: postId, rating: createVote.data })
        }
      },
      deleteAuth: (_result: DeleteAuthMutation, _, cache) => {
        customUpdateQuery<DeleteAuthMutation, GetAuthQuery>(cache, { query: GetAuthDocument }, _result, () => ({ getAuth: null }))
        invalidatePosts(cache)
      },
      createAuth: (_result: CreateAuthMutation, _, cache) => {
        customUpdateQuery<CreateAuthMutation, GetAuthQuery>(cache, { query: GetAuthDocument }, _result, (result, query) => {
          return result.createAuth.errors ? query : { getAuth: result.createAuth.data };
        })
        invalidatePosts(cache)
      },
      createUser: (_result: CreateUserMutation, _, cache) => {
        customUpdateQuery<CreateUserMutation, GetAuthQuery>(cache, { query: GetAuthDocument }, _result, (result, query) => {
          return result.createUser.errors ? query : { getAuth: result.createUser.data };
        })
      },
    }
  }
}

export default function createUrqlClient(ssrExchange: any, ctx: any) {
  return {
    url: API_HOST,
    exchanges: [dedupExchange, cacheExchange(cachePolicy), ErrorExchange, ssrExchange, fetchExchange],
    // requestPolicy: "cache-and-network",
    fetchOptions: {
      credentials: 'include' as const,
      headers: isServer() && ctx ? { cookie: ctx?.req.headers.cookie } : undefined
    }
  };
};
