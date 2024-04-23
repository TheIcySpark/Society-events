import React from 'react';
import { Box, Flex, Heading, Text, Button, Image, Stack, useColorModeValue } from '@chakra-ui/react';
import HeroImage from '../assets/images/hero.jpg'; // Importa la imagen del héroe

const HomePage: React.FC = () => {
  return (
    <Flex align="center" justify="center" direction="column" minH="100vh">
      <Box maxW="600px" textAlign="center" px={4}>
        <Heading as="h1" size="2xl" mb={6}>
          ¡Bienvenido a mi Página de Inicio!
        </Heading>
        <Text fontSize="xl" mb={8}>
          Aquí puedes colocar una descripción breve de tu página de inicio y lo que ofrece tu sitio web o aplicación.
        </Text>
        <Button colorScheme="teal" size="lg" mb={4}>
          Iniciar sesión
        </Button>
        <Button variant="outline" size="lg">
          Registrarse
        </Button>
      </Box>
      
    </Flex>
  );
};

export default HomePage;
