import { Stack } from '@chakra-ui/react';
import { Post } from '../typings';
import { PostItem } from "./PostItem";

interface IProps {
  items: Post[]
}

export const PostList = ({ items }: IProps) => (
  <Stack spacing={6} w="100%">
    {items.map(post => post.id && <PostItem data={post} key={post.id} />)}
  </Stack>
);
