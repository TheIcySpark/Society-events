import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import HeroImage from '../assets/images/hero.jpg'; // Importa la imagen del héroe
import CreateEventForm from '../components/CreateEventForm';

const HomePage: React.FC = () => {
  return (
    <Flex>
      {/* División izquierda (oculta en dispositivos móviles) */}
      <Box bg="#050a11" display={{ base: 'none', md: 'block' }} w={{ base: '0%', md: '15%' }} />
      
      {/* División central */}
      <Box w={{ base: '100%', md: '70%' }} overflowY="auto" h="80vh">
        
      </Box>
      
      {/* División derecha (oculta en dispositivos móviles) */}
      <Box display={{ base: 'none', md: 'block' }} w={{ base: '0%', md: '15%' }} />
    </Flex>
  );
};

export default HomePage;
