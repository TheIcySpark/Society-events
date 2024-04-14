import * as React from "react"

import { Box, Button, ChakraProvider, Container, FormControl, FormLabel, Heading, Highlight, Image, Input, Spinner, Stack, theme, useBreakpointValue } from "@chakra-ui/react"



export default function Login() {
  const formSize = useBreakpointValue({ base: 'sm', md: 'md' });
  return (
    <ChakraProvider theme={theme}>
      <Container centerContent py={{ base: '12', md: '24' }}>
        <Stack
          spacing={4}
          w={{ base: 'full', md: 'md' }}
          maxW={'md'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={{ base: 4, md: 8 }}
        >
          <Heading >
            Society Events
          </Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" size={formSize} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" size={formSize} />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme="blue" variant="solid">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Container>
    </ChakraProvider>
  )
}