import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthInputDto = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type FieldErrorDto = {
  __typename?: 'FieldErrorDto';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type HealthResponseDto = {
  __typename?: 'HealthResponseDto';
  status: Scalars['String'];
  tz: Scalars['String'];
  uptime: Scalars['String'];
  activeConnections: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuth: UserResponseDto;
  deleteAuth: Scalars['Boolean'];
  createPost: PostResponseDto;
  updatePost?: Maybe<PostResponseDto>;
  deletePost: PostResponseDto;
  createVote: VoteResponseDto;
  createUser: UserResponseDto;
  changePassword: UserResponseDto;
  updatePassword: UserResponseDto;
};


export type MutationCreateAuthArgs = {
  options: AuthInputDto;
};


export type MutationCreatePostArgs = {
  options: PostInputDto;
};


export type MutationUpdatePostArgs = {
  options: PostInputDto;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateVoteArgs = {
  value: Scalars['Float'];
  postId: Scalars['Float'];
};


export type MutationCreateUserArgs = {
  options: UserInputDto;
};


export type MutationChangePasswordArgs = {
  email: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  options: NewPasswordInputDto;
};

export type NewPasswordInputDto = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type PaginatedInputDto = {
  limit: Scalars['Float'];
  cursor: Scalars['String'];
  sorting: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
  votes: Array<Vote>;
  rating?: Maybe<Scalars['Int']>;
  userVote?: Maybe<Vote>;
  textSnippet: Scalars['String'];
};

export type PostInputDto = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type PostResponseDto = {
  __typename?: 'PostResponseDto';
  errors?: Maybe<Array<FieldErrorDto>>;
  data?: Maybe<Post>;
};

export type PostsResponseDto = {
  __typename?: 'PostsResponseDto';
  items: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getAuth?: Maybe<User>;
  getHealth: HealthResponseDto;
  getPosts: PostsResponseDto;
  getPost?: Maybe<Post>;
};


export type QueryGetPostsArgs = {
  params: PaginatedInputDto;
};


export type QueryGetPostArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInputDto = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponseDto = {
  __typename?: 'UserResponseDto';
  errors?: Maybe<Array<FieldErrorDto>>;
  data?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  value: Scalars['Float'];
  user: User;
};

export type VoteResponseDto = {
  __typename?: 'VoteResponseDto';
  errors?: Maybe<Array<FieldErrorDto>>;
  data?: Maybe<Scalars['Float']>;
};

export type BaseErrorFragment = (
  { __typename?: 'FieldErrorDto' }
  & Pick<FieldErrorDto, 'field' | 'message'>
);

export type BasePostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'rating' | 'createdAt'>
  & { userVote?: Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'value'>
  )>, creator: (
    { __typename?: 'User' }
    & BaseUserFragment
  ) }
);

export type BasePostResponseFragment = (
  { __typename?: 'PostResponseDto' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldErrorDto' }
    & BaseErrorFragment
  )>>, data?: Maybe<(
    { __typename?: 'Post' }
    & BasePostFragment
  )> }
);

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type BaseUserResponseFragment = (
  { __typename?: 'UserResponseDto' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldErrorDto' }
    & BaseErrorFragment
  )>>, data?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponseDto' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
);

export type CreateAuthMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAuthMutation = (
  { __typename?: 'Mutation' }
  & { createAuth: (
    { __typename?: 'UserResponseDto' }
    & BaseUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponseDto' }
    & BasePostResponseFragment
  ) }
);

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponseDto' }
    & BaseUserResponseFragment
  ) }
);

export type CreateVoteMutationVariables = Exact<{
  postId: Scalars['Float'];
  value: Scalars['Float'];
}>;


export type CreateVoteMutation = (
  { __typename?: 'Mutation' }
  & { createVote: (
    { __typename?: 'VoteResponseDto' }
    & Pick<VoteResponseDto, 'data'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
);

export type DeleteAuthMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAuthMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAuth'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'PostResponseDto' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
);

export type UpdatePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { updatePassword: (
    { __typename?: 'UserResponseDto' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
);

export type GetAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthQuery = (
  { __typename?: 'Query' }
  & { getAuth?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'text'>
    & BasePostFragment
  )> }
);

export type GetPostsQueryVariables = Exact<{
  limit: Scalars['Float'];
  cursor: Scalars['String'];
  sorting: Scalars['String'];
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'PostsResponseDto' }
    & Pick<PostsResponseDto, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'textSnippet'>
      & BasePostFragment
    )> }
  ) }
);

export const BaseErrorFragmentDoc = gql`
    fragment BaseError on FieldErrorDto {
  field
  message
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  username
}
    `;
export const BasePostFragmentDoc = gql`
    fragment BasePost on Post {
  id
  title
  rating
  createdAt
  userVote {
    value
  }
  creator {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;
export const BasePostResponseFragmentDoc = gql`
    fragment BasePostResponse on PostResponseDto {
  errors {
    ...BaseError
  }
  data {
    ...BasePost
  }
}
    ${BaseErrorFragmentDoc}
${BasePostFragmentDoc}`;
export const BaseUserResponseFragmentDoc = gql`
    fragment BaseUserResponse on UserResponseDto {
  errors {
    ...BaseError
  }
  data {
    ...BaseUser
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($email: String!) {
  changePassword(email: $email) {
    errors {
      ...BaseError
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateAuthDocument = gql`
    mutation CreateAuth($usernameOrEmail: String!, $password: String!) {
  createAuth(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;

export function useCreateAuthMutation() {
  return Urql.useMutation<CreateAuthMutation, CreateAuthMutationVariables>(CreateAuthDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $text: String!) {
  createPost(options: {title: $title, text: $text}) {
    ...BasePostResponse
  }
}
    ${BasePostResponseFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(options: {username: $username, email: $email, password: $password}) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const CreateVoteDocument = gql`
    mutation CreateVote($postId: Float!, $value: Float!) {
  createVote(postId: $postId, value: $value) {
    errors {
      ...BaseError
    }
    data
  }
}
    ${BaseErrorFragmentDoc}`;

export function useCreateVoteMutation() {
  return Urql.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument);
};
export const DeleteAuthDocument = gql`
    mutation DeleteAuth {
  deleteAuth
}
    `;

export function useDeleteAuthMutation() {
  return Urql.useMutation<DeleteAuthMutation, DeleteAuthMutationVariables>(DeleteAuthDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id) {
    errors {
      ...BaseError
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($token: String!, $password: String!) {
  updatePassword(options: {token: $token, password: $password}) {
    errors {
      ...BaseError
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const GetAuthDocument = gql`
    query GetAuth {
  getAuth {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useGetAuthQuery(options: Omit<Urql.UseQueryArgs<GetAuthQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAuthQuery>({ query: GetAuthDocument, ...options });
};
export const GetPostDocument = gql`
    query GetPost($id: Float!) {
  getPost(id: $id) {
    ...BasePost
    text
  }
}
    ${BasePostFragmentDoc}`;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const GetPostsDocument = gql`
    query GetPosts($limit: Float!, $cursor: String!, $sorting: String!) {
  getPosts(params: {limit: $limit, cursor: $cursor, sorting: $sorting}) {
    items {
      ...BasePost
      textSnippet
    }
    hasMore
  }
}
    ${BasePostFragmentDoc}`;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};