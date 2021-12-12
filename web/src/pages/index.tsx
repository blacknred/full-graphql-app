import { WarningTwoIcon } from '@chakra-ui/icons'
import {
  Box, Button, Center, Flex, SlideFade, Square
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import { PostList } from '../components/PostList'
import { Sidebar } from '../components/Sidebar'
import useOnViewport from '../hooks/useOnViewport'
import { GetPostsQueryVariables, Post, useGetPostsQuery } from '../types'
import urqlClient from '../lib/graphql/urql'

const Index = () => {
  const [variables, setVariables] = useState<GetPostsQueryVariables>({
    limit: 10, cursor: '', sorting: 'createdAt'
  });
  const [{ data, fetching }] = useGetPostsQuery({ variables })

  const [ref] = useOnViewport((isVisible) => {
    if (isVisible && data?.getPosts.hasMore) {
      console.log(3434);

      const cursor = data.getPosts.items[data.getPosts.items.length - 1].createdAt;
      setVariables(s => ({ ...s, cursor }))
    }
  });

  return (
    <Layout>
      <Meta />
      <Flex>
        <Square size="70%" flexDirection="column" mr="6">
          <SlideFade in offsetY="80px" style={{ width: '100%' }}>
            {!data && !fetching && <Center mt="100"><WarningTwoIcon color="teal.300" fontSize="6xl" /></Center>}
            {data && <PostList items={data.getPosts.items as Post[]} />}
            {data?.getPosts.hasMore && (
              <Center m="6"><Button colorScheme="cyan" color="blackAlpha.300" size="lg" m="auto" fontSize="2xl" isLoading/></Center>
            )}
          </SlideFade>
        </Square>
        <Box flex="1" w="30%">
          <SlideFade in offsetY="-100px">
            <Sidebar type="feed" />
          </SlideFade>
        </Box>
      </Flex>
      <Box ref={ref as React.LegacyRef<HTMLDivElement> | undefined}/>
    </Layout>
  )
}

export default withUrqlClient(urqlClient, { ssr: true })(Index)
