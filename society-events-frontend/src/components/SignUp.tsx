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
  Button,
  Text,
  Link as ChakraLink,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

function SignUpForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // Agrega un nuevo estado para controlar si se debe mostrar la contraseña
const [showPassword, setShowPassword] = useState(false);

// Define una función para alternar el estado de mostrar/ocultar contraseña
const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    } else if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    } else if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    } else {
      setConfirmPasswordError('');
    }
    if (validateEmail(formData.email) || validatePassword(formData.password)) {
      return;
    }
    // Aquí puedes enviar los datos del formulario al servidor
    console.log(formData);
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError('Email is required');
      return true;
    }
    if (!value.includes('@')) {
      setEmailError('Email must contain @');
      return true;
    }
    setEmailError('');
    return false;
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setPasswordError('Password is required');
      return true;
    }
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return true;
    }
    if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return true;
    }
    if (!/\d/.test(value)) {
      setPasswordError('Password must contain at least one number');
      return true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      setPasswordError('Password must contain at least one punctuation character (!@#$%^&*)');
      return true;
    }
    setPasswordError('');
    return false;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value.trim()) {
      setConfirmPasswordError('Confirm password is required');
      return true;
    }
    if (value !== formData.password) {
      setConfirmPasswordError('Passwords do not match');
      return true;
    }
    setConfirmPasswordError('');
    return false;
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

              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  bg="white"
                  borderColor="black"
                />
              </FormControl>
              <FormControl id="email" isInvalid={!!emailError} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="white"
                  borderColor="black"
                />
                <Text color="red.500">{emailError}</Text>
              </FormControl>
              <FormControl id="password" isInvalid={!!passwordError} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'} // Cambia el tipo de entrada dinámicamente
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    bg="white"
                    borderColor="black"
                  />
                  
                  <InputRightElement width='4.5rem' height="100%">
                    <Button h='1.5rem' size='sm' onClick={toggleShowPassword}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="red.500">{passwordError}</Text>
              </FormControl>
              <FormControl id="confirmPassword" isInvalid={!!confirmPasswordError} isRequired>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  bg="white"
                  borderColor="black"
                />
                <Text color="red.500">{confirmPasswordError}</Text>
              </FormControl>
              <Button colorScheme="blue" variant="solid" type="submit" mt={4} width="full">
                Create Account
              </Button>
              <Text align="center">
                Already have an account?
                <ChakraLink as={ChakraLink} href="/login" color="blue.500">
                  Login
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default SignUpForm;