import * as React from "react"

import {
  Text,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  theme,
  useBreakpointValue,
  Box,
  Flex
} from "@chakra-ui/react"



export default function Login() {
  const formSize = useBreakpointValue({ base: 'sm', md: 'md' });
  return (
    <ChakraProvider theme={theme} >
      <Box bg="#050a11" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Container centerContent py={{ base: '12', md: '24' }} >

          <Stack
            spacing={4}
            w={{ base: 'full', md: 'full' }}
            rounded={'xl'}
            boxShadow={'lg'}
            p={{ base: 4, md: 8 }}
            bg="white"
          >
            <Heading alignContent="center">
              Society Events - Login
            </Heading>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" size={formSize} />
            </FormControl>

            <FormControl id="password">
              <Flex justify="space-between" align="baseline">
                <FormLabel>Password</FormLabel>
                <Text>
                  <ChakraLink as={ChakraLink} href="/forgotPassword" color="blue.500">Forgot password?</ChakraLink>
                </Text>
              </Flex>
              <Input type="password" size={formSize} />
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme="blue" variant="solid">
                Login
              </Button>
              <Text>
                <ChakraLink as={ChakraLink} href="/signUp" color="blue.500">
                  Create an account
                </ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}