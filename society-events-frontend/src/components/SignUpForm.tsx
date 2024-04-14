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
      <Container centerContent py={{ base: '12', md: '24' }}>
        <Stack
          spacing={4}
          w={{ base: 'full', md: 'full' }}
          rounded={'xl'}
          boxShadow={'lg'}
          p={{ base: 4, md: 8 }}
        >
          <Heading>Society Events - Crear cuenta </Heading>
          <form onSubmit={handleSubmit}>
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
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                size="md"
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirmar contraseña</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                size="md"
              />
            </FormControl>
            <Button colorScheme="blue" variant="solid" type="submit" mt={4} width="full">
              Crear cuenta
            </Button>
            <Text>
              <ChakraLink as={ChakraLink} href="/login" color="blue.500">
                Login
              </ChakraLink>
          </Text>
          </form>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default SignUpForm;
