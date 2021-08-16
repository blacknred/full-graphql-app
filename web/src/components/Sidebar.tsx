import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, Select, Stack, useColorModeValue } from '@chakra-ui/react';
import router from 'next/router';
import React, { LegacyRef, useRef } from 'react';
import useOnViewport from '../hooks/useOnViewport';
import { Post, useDeletePostMutation, useMeQuery } from '../typings';
import { getRandBgColor } from '../utils';
import AuthLink from './AuthLink';

interface IProps {
  type?: 'feed' | 'post' | 'default',
  post?: Post
}

export const Sidebar = ({ type = 'default', post }: IProps) => {
  const [{ data }] = useMeQuery();
  const fixedRef = useRef<HTMLDivElement>(null);
  const saturation = useColorModeValue(400, 100)
  const bg = useColorModeValue('gray.800', 'white')
  const [{ fetching: isDeleting }, deletePost] = useDeletePostMutation()
  const [ref] = useOnViewport((isVisible) => {
    if (!fixedRef.current) return;
    fixedRef.current.style.position = isVisible ? 'initial' : 'fixed';
    fixedRef.current.style.top = isVisible ? 'auto' : '0px';
    fixedRef.current.style.width = isVisible ? 'initial' : '290px';
  });
console.log(data?.me?.id, post?.creatorId);

  return (
    <>
      <Stack spacing="6" ref={ref as LegacyRef<HTMLDivElement> | undefined}>
        {type !== 'default' && (
          <AuthLink href="/post">
            <Button isFullWidth leftIcon={<PlusSquareIcon />} size="lg" variant="outline" colorScheme="teal" mr={8}>
              Create a post
            </Button>
          </AuthLink>
        )}
        {type === 'feed' && (
          <Box bg={bg} h={200} p="4">
            <Select variant="outline" color="teal">
              <option value="option1" defaultChecked>Sorting by timeline</option>
              <option value="option2">Sorting by upvotes</option>
            </Select>
          </Box>
        )}
        {type === 'post' && data?.me?.id === post?.creatorId && (
          <Box bg={bg} h={200} p="4">
            <Button
              mb="4"
              leftIcon={<EditIcon />}
              isFullWidth
              borderColor="teal.500"
              color="teal.500"
              variant="outline"
            >Update post</Button>
            <Button
              leftIcon={<DeleteIcon />}
              isFullWidth
              variant="solid"
              borderColor="red.500"
              isLoading={isDeleting}
              color="red.500"
              onClick={() => deletePost({ id: post!.id }).finally(() => router.back())}>
              Delete post
            </Button>
          </Box>
        )}
        <Box borderWidth="2px" borderRadius="3" borderColor={getRandBgColor(saturation)} h={200}></Box>
        <Box bg={getRandBgColor(saturation)} h={300}></Box>
      </Stack>

      <Box ref={fixedRef} bg={bg} h={200} mt="6"></Box>
    </>
  );
};
