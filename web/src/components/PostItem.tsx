import { ChatIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box, Button, Center, Divider, Flex, Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Post } from '../typings';
import { getRandBgColor, timeSince } from '../utils';
import { VoteSection } from './VoteSection';

interface IProps {
  data: Post
  isFull?: boolean;
}

export const PostItem = ({ data, isFull = false }: IProps) => {
  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('gray.300', 'blackAlpha')
  const saturation = useColorModeValue(500, 200)

  const content = (
    <Box px="7" pb="3" cursor={isFull ? "initial" : "pointer"}>
      <Heading color={color} fontSize="xl">{data.title}</Heading>
      <Text mt={4} color={color} fontFamily="mono">{data.textSnippet || data.text || ''}</Text>
    </Box>
  );

  return (
    <Flex alignItems="flex-start" grow={1}>
      <VoteSection rating={data.rating} value={data.userVote?.value} postId={data.id} />

      <Stack bgColor={Math.random() > 0.2 ? bg : getRandBgColor(saturation)} flex="1" borderColor="red">
        <Flex px="7" py="5" alignItems="center">
          <Avatar size="xs" mr="2" name={data.creator.username} />
          <Heading size="xs" color={color} mr="3">{data.creator.username}</Heading>
          <Text fontSize="xs" color={color}>{timeSince(data.createdAt)}</Text>
        </Flex>

        {isFull ? content : <NextLink href={`/post/${data.id}`}>{content}</NextLink>}

        <Box px="7" py="5" bgColor={bg} opacity="0.5">
          <NextLink href={`/post/${data.id}#comments`}>
            <Button leftIcon={<ChatIcon />} size="md" variant="link" mr="5" color={color}>
              {Math.floor(Math.random() * +data.createdAt.slice(10))}
            </Button>
          </NextLink>
          <Button leftIcon={<ViewIcon />} size="md" variant="link" color={color}>
            {Math.floor(Math.random() * +data.createdAt.slice(9))}
          </Button>
        </Box>

        {isFull && (
          <Box id="comments" my="5" bgColor={bg} h="2000">
            <Divider />
            <Center mt="10"><Heading size="sm" color={color}>Comments</Heading></Center>
          </Box>
        )}
      </Stack>
    </Flex>
  )
}
