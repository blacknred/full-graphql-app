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

export type LoginInputDto = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponseDto;
  updatePost?: Maybe<PostResponseDto>;
  deletePost: PostResponseDto;
  vote: VoteResponseDto;
  register: UserResponseDto;
  login: UserResponseDto;
  logout: Scalars['Boolean'];
  forgotPassword: UserResponseDto;
  changePassword: UserResponseDto;
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


export type MutationVoteArgs = {
  value: Scalars['Float'];
  postId: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: RegisterInputDto;
};


export type MutationLoginArgs = {
  options: LoginInputDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
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
  health: HealthResponseDto;
  getPosts: PostsResponseDto;
  getPost?: Maybe<Post>;
  me?: Maybe<User>;
};


export type QueryGetPostsArgs = {
  params: PaginatedInputDto;
};


export type QueryGetPostArgs = {
  id: Scalars['Float'];
};

export type RegisterInputDto = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
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
  token: Scalars['String'];
  password: Scalars['String'];
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

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'UserResponseDto' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponseDto' }
    & BaseUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponseDto' }
    & BaseUserResponseFragment
  ) }
);

export type VoteMutationVariables = Exact<{
  postId: Scalars['Float'];
  value: Scalars['Float'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'VoteResponseDto' }
    & Pick<VoteResponseDto, 'data'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorDto' }
      & BaseErrorFragment
    )>> }
  ) }
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
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
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(options: {token: $token, password: $password}) {
    errors {
      ...BaseError
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      ...BaseError
    }
  }
}
    ${BaseErrorFragmentDoc}`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VoteDocument = gql`
    mutation Vote($postId: Float!, $value: Float!) {
  vote(postId: $postId, value: $value) {
    errors {
      ...BaseError
    }
    data
  }
}
    ${BaseErrorFragmentDoc}`;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
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
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};