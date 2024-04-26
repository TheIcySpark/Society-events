import React from 'react';
import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import HeroImage from '../assets/images/hero.jpg'; // Importa la imagen del héroe
import CreateEventForm from '../components/CreateEventForm';
import EventDisplay from '../components/EventDisplay';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  
  return (
    <Flex>
      
      {/* División central */}
      <Box bg="#050a33" w={{ base: '100%', md: '100%' }} display="flex" flexDirection="column" alignItems="center" >
        <CreateEventForm ></CreateEventForm>
        <Divider  marginTop="10px" marginBottom="10px" ></Divider>
        <EventDisplay></EventDisplay>
        <Footer/>
      </Box>

    </Flex>
  );


  
};

export default HomePage;
