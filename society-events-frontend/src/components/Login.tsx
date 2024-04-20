import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link as ChakraLink,
  FormErrorMessage,
  Flex,
  useBreakpointValue,
  theme,
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email) && !validatePassword(password)) {
      // Aquí puedes enviar los datos al backend o realizar otras acciones necesarias
    }
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!value.includes('@')) {
      return 'Email must contain @';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return 'Password is required';
    }
    return '';
  };

  const formSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
  return (
    <ChakraProvider theme={theme}>
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
              <Heading alignContent="center">
                Society Events - Login
              </Heading>

              <FormControl isInvalid={!!emailError} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  bg="white"
                  borderColor="black"
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!passwordError} isRequired>
                <Stack spacing={2}>
                  <Flex justify="space-between" align="baseline">
                    <FormLabel>Password</FormLabel>
                    <Text>
                      <ChakraLink href="/forgotPassword" color="blue.500">Forgot password?</ChakraLink>
                    </Text>
                  </Flex>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      bg="white"
                      borderColor="black"
                    />
                    <InputRightElement width='4.5rem' height="100%">
                      <Button h='1.5rem' size='sm' onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{passwordError}</FormErrorMessage>
                </Stack>
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg">
                Login
              </Button>
              
              <Text align="center">
                Don't have an account? <ChakraLink href="/signUp" color="blue.500">Sign up</ChakraLink>
              </Text>
            </Stack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
