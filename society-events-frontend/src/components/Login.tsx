import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(''); // Estado para el error de username
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError(validateUsername(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateUsername(username) && !validatePassword(password)) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          username, // Enviar username en lugar de email
          password,
        });

        const accessToken = response.data.access;
        const userId = response.data.user_id; // Suponiendo que el ID de usuario se envía como parte de la respuesta
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId); // Asegúrate de usar el mismo nombre "userId" aquí
        console.log("Token received:", accessToken);

        // Redirigir a la vista de eventos después de iniciar sesión
        window.location.href = "/homePage";
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Comprobación del token en el localStorage al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const validateUsername = (value: string) => {
    if (!value.trim()) {
      return "Username is required";
    }
    return "";
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
      <Box
        bg="#050a11"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container centerContent py={{ base: "12", md: "24" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              w={{ base: "full", md: "full" }}
              rounded={"xl"}
              boxShadow={"lg"}
              p={{ base: 4, md: 8 }}
              bg="#A8DADC"
            >
              <Heading>Society Events - Login</Heading>

              <FormControl isInvalid={!!usernameError} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  bg="white"
                  borderColor="black"
                />
                <FormErrorMessage>{usernameError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!passwordError} isRequired>
                <Stack spacing={2}>
                  <Flex justify="space-between" align="baseline">
                    <FormLabel>Password</FormLabel>
                    <Text>
                      <ChakraLink href="/forgotPassword" color="blue.500">
                        Forgot password?
                      </ChakraLink>
                    </Text>
                  </Flex>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      bg="white"
                      borderColor="black"
                    />
                    <InputRightElement width="4.5rem" height="100%">
                      <Button h="1.5rem" size="sm" onClick={toggleShowPassword}>
                        {showPassword ? "Hide" : "Show"}
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
                Don't have an account?{" "}
                <ChakraLink href="/signUp" color="blue.500">
                  Sign up
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
function setUsername(value: string) {
  throw new Error('Function not implemented.');
}

