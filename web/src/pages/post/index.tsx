import { Box, Button, Flex, Heading, SlideFade, Square, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../components/InputField';
import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import { Sidebar } from '../../components/Sidebar';
import { useCreatePostMutation } from '../../typings';
import urqlClient from '../../urqlClient';
import { errorMap } from '../../utils';

interface IProps { }

const NewPost: React.FC<IProps> = ({ }) => {
  const color = useColorModeValue('gray.300', 'blackAlpha')
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <Layout>
      <Meta title="New post" />
      <Flex>
        <Square size="70%" flexDirection="column" mr="6">
          <Formik
            initialValues={{ title: "", text: "" }}
            onSubmit={(values, actions) => {
              createPost(values)
                .then((res) => {
                  if (res.data?.createPost.errors) {
                    actions.setErrors(errorMap(res.data.createPost.errors));
                  } else {
                    router.push('/')
                  }
                })
                .catch(e => console.log(e.message))
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                <Heading color={color} size="md" mb="6">Add new post</Heading>

                <InputField name="title" area rows={2} />
                <Box mt={4}><InputField name="text" area rows={15}/></Box>

                <Flex justifyContent="space-between" alignItems="baseline">
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Publish
                  </Button>
                  <NextLink href="/"><Button>Cancel</Button></NextLink>
                </Flex>
              </Form>
            )}
          </Formik>
        </Square>
        <Box flex="1" w="30%">
          <SlideFade in offsetY="-100px">
            <Sidebar />
          </SlideFade>
        </Box>
      </Flex>
    </Layout>
  )
}

export default withUrqlClient(urqlClient)(NewPost)