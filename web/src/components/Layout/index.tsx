import { ArrowForwardIcon, ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import {
  useDeleteAuthMutation,
  useGetAuthQuery
} from '../../types';

interface IProps {
  variant?: 'lg' | 'sm',
}

const Layout: FC<IProps> = ({ children, variant = 'lg' }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [{ data }] = useGetAuthQuery();
  const [{ fetching }, logout] = useDeleteAuthMutation();
  const width = variant === 'lg' ? 1050 : 400;
  const bg = useColorModeValue("gray.900", "gray.50")
  const color = useColorModeValue('gray.300', 'gray.600')

  return (
    <Box bgColor={bg} minH="100vh" pt={variant === 'sm' ? '50' : 0}>
      <Flex py={4} justifyContent="space-between" maxW={width} m="auto">
        <NextLink href="/"><Heading color={color} cursor="pointer" fontSize="xx-large">Pikaru</Heading></NextLink>
        {variant === 'lg' && (
          <Box>
            {data?.getAuth ? (
              <>
                <Button variant="link" color={color} size="md">{data?.getAuth?.username}</Button>
                <IconButton
                  ml={4}
                  aria-label="Logout"
                  size="sm"
                  fontSize="lg"
                  isLoading={fetching}
                  onClick={() => logout()}
                  icon={<ExternalLinkIcon />}
                />
              </>
            ) : (
              <>
                <NextLink href="/register">
                  <Button variant="link" color={color} size="md" mr={2}>Join now</Button>
                </NextLink>
                <NextLink href="/login">
                  <IconButton
                    ml={4}
                    aria-label="Logout"
                    size="sm"
                    fontSize="lg"
                    icon={<ArrowForwardIcon />}
                  />
                </NextLink>
              </>
            )}
            <IconButton
              ml={4}
              aria-label="Call Sage"
              size="sm"
              fontSize="lg"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            />
          </Box>
        )}
      </Flex >
      <Box mt={8} mx="auto" w="100%" maxW={width}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout