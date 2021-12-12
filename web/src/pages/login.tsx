import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import { useCreateAuthMutation } from '../types';
import urqlClient from '../lib/graphql/urql';
import { errorMap } from '../utils';

const authMessages = {
  'new-password-sent': 'The confirmation link was sent to the email address.',
  'new-password-done': 'Password was successfully changed.',
};

interface IProps { }

const Login: React.FC<IProps> = ({ }) => {
   const router = useRouter();
  const [, register] = useCreateAuthMutation();
  const notification = authMessages[router.asPath.split('#')[1] as keyof typeof authMessages]

  return (
    <Layout variant="sm">
      <Meta title="Login" />
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={(values, actions) => {
          register(values)
            .then(res => {
              if (res.data?.createAuth.errors) {
                actions.setErrors(errorMap(res.data.createAuth.errors));
              } else {
                const target = typeof router.query.next === 'string' ? router.query.next : '/'
                router.push(target)
              }
            })
            .catch(e => console.log(e.message))
            .finally(() => actions.setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {notification && <Box mb={5} p="4" bgColor="teal.50" color="green">{notification}</Box>}
            <InputField name="usernameOrEmail" label="Username or email" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>

            <Flex justifyContent="space-between" alignItems="baseline">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <NextLink href="/forgot-password"><Button>Forgot password</Button></NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default withUrqlClient(urqlClient)(Login)