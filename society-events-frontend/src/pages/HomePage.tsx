import React from 'react';
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import HeroImage from '../assets/images/hero.jpg'; // Importa la imagen del héroe
import CreateEventForm from '../components/CreateEventForm';

const HomePage: React.FC = () => {
  
  return (
    <Flex>
      {/* División izquierda (oculta en dispositivos móviles) */}
      <Box bg="#050a11" display={{ base: 'none', md: 'block' }} w={{ base: '0%', md: '25%' }} h="100vh"/>
      
      {/* División central */}
      <Box bg="#050a33" w={{ base: '100%', md: '75%' }} overflowY="auto" h="100vh" >
        <CreateEventForm></CreateEventForm>
      </Box>

    </Flex>
  );


  
};

export default HomePage;
