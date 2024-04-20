import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/react';

function SignUpForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Aquí puedes enviar los datos del formulario al servidor
      console.log(formData);
    }
  };

  return (
    <ChakraProvider>
      <Box bg="#050a11" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Container centerContent py={{ base: '12', md: '24' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              w={{ base: 'full', md: 'full' }}
              rounded={'xl'}
              boxShadow={'lg'}
              p={{ base: 4, md: 8 }}
              bg="#A8DADC"
            >
              <Heading>Society Events - Create an Account </Heading>

              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  size="md"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="md"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  size="md"
                />
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  size="md"
                />
              </FormControl>
              <Stack spacing={6}>
                <Button colorScheme="blue" variant="solid" type="submit" mt={4} width="full">
                  Create an account
                </Button>
                <Text>
                  <ChakraLink as={ChakraLink} href="/login" color="blue.500">
                    Login
                  </ChakraLink>
                </Text>
              </Stack>

            </Stack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default SignUpForm;
