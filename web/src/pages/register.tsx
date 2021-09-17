import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import { useCreateUserMutation } from '../typings';
import urqlClient from '../urql';
import { errorMap } from '../utils';

interface IProps { }

const Register: FC<IProps> = ({ }) => {
  const [, register] = useCreateUserMutation();
  const router = useRouter();

  return (
    <Layout variant="sm">
      <Meta title="Registration" />
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          register(values)
            .then(res => {
              if (res.data?.createUser.errors) {
                actions.setErrors(errorMap(res.data.createUser.errors));
              } else {
                router.push('/')
              }
            })
            .catch(e => console.log(e.message))
            .finally(() => actions.setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField name="email" label="Email" type="email" />
            </Box>
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
                Register
              </Button>
              <NextLink href="/login">
                <Button>Already have an account</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default withUrqlClient(urqlClient)(Register)