import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Spinner, useColorModeValue } from '@chakra-ui/react';
import { Post, useCreateVoteMutation, useGetAuthQuery, Vote } from '../../../../types';

interface IProps {
  rating: Post['rating'];
  value?: Vote['value'];
  postId: Post['id']
}

export const VoteSection = ({ rating: total = 0, value, postId }: IProps) => {
  const color = useColorModeValue('gray.300', 'blackAlpha')
  // const color = useColorModeValue('300', 'blackAlpha')
  const [{ fetching }, vote] = useCreateVoteMutation();
  const [{ data }] = useGetAuthQuery();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={3}>
      <IconButton
        disabled={!data?.getAuth}
        color={value === 1 ? 'teal.500' : 'gray.300'}
        variant="ghost"
        fontSize="xx-large"
        onClick={() => vote({ postId, value: 1 })}
        icon={<TriangleUpIcon />}
        aria-label="vote up"
      />
      {fetching ? <Spinner /> : <Heading color={color} size="sm">{total}</Heading>}
      <IconButton
        disabled={!data?.getAuth}
        color={value === -1 ? 'pink.500' : 'gray.300'}
        variant="ghost"
        fontSize="xx-large"
        onClick={() => vote({ postId, value: -1 })}
        icon={<TriangleDownIcon />}
        aria-label="vote down"
      />
    </Flex>
  );
};

