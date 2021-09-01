import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, SlideFade, Square } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import { PostItem } from '../../components/PostList/PostItem';
import { Sidebar } from '../../components/Sidebar';
import { Post, useGetPostQuery } from '../../typings';
import urqlClient from '../../urqlClient';

interface IProps { }

const FullPost: React.FC<IProps> = ({ }) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetPostQuery({
    variables: { id: +router.query.id! }
  })

  return (
    <Layout>
      <Meta title="Post" />
      <Flex>
        <Square size="70%" flexDirection="column" mr="6">
          <SlideFade in offsetY="80px" style={{ width: '100%' }}>
            {!data && !fetching && <Center mt="100"><WarningTwoIcon color="teal.300" fontSize="6xl" /></Center>}
            {data && <PostItem data={data.getPost as Post} isFull />}
          </SlideFade>
        </Square>
        <Box flex="1" w="30%">
          <SlideFade in offsetY="-100px">
            <Sidebar type="post" post={data?.getPost as Post} />
          </SlideFade>
        </Box>
      </Flex>
    </Layout>
  )
}

export default withUrqlClient(urqlClient, { ssr: true })(FullPost)