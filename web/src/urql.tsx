import { Cache, cacheExchange, CacheExchangeOpts, Resolver } from '@urql/exchange-graphcache';
import router from 'next/router';
import { dedupExchange, Exchange, fetchExchange, gql, stringifyVariables } from 'urql';
import { pipe, tap } from 'wonka';
import { DeletePostMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, VoteMutation } from './typings';
import { customUpdateQuery, isServer } from './utils';

const ErrorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('ot authenticated')) {
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
      vote: ({ vote }: VoteMutation, { postId }, cache) => {
        if (!vote.errors) {
          cache.writeFragment(gql`fragment _ on Post { rating }`, { id: postId, rating: vote.data })
        }
      },
      logout: (_result: LogoutMutation, _, cache) => {
        customUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }))
        invalidatePosts(cache)
      },
      login: (_result: LoginMutation, _, cache) => {
        customUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
          return result.login.errors ? query : { me: result.login.data };
        })
        invalidatePosts(cache)
      },
      register: (_result: RegisterMutation, _, cache) => {
        customUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
          return result.register.errors ? query : { me: result.register.data };
        })
      },
    }
  }
}

export default function createUrqlClient(ssrExchange: any, ctx: any) {
  return {
    url: 'http://localhost:4000/graphql',
    exchanges: [dedupExchange, cacheExchange(cachePolicy), ErrorExchange, ssrExchange, fetchExchange],
    // requestPolicy: "cache-and-network",
    fetchOptions: {
      credentials: 'include' as const,
      headers: isServer() && ctx ? { cookie: ctx?.req.headers.cookie } : undefined
    }
  };
};
