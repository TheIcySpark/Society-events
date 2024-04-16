import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

// Define la interfaz de las props si planeas recibir la prop isLoggedIn
interface LandingPageProps {
  isLoggedIn: boolean;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  // Puedes usar useState para manejar el estado de isLoggedIn dentro de LandingPage si es necesario
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Supongamos que el usuario no está autenticado inicialmente

  return (
    <ChakraProvider>
      {/* Pasamos isLoggedIn al Navbar */}
      <Navbar />
      {/* Aquí va el contenido de tu landing page */}
      <Footer />
    </ChakraProvider>
  );
};

export default LandingPage;
