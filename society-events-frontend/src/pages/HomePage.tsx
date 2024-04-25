import React from 'react';
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import HeroImage from '../assets/images/hero.jpg'; // Importa la imagen del héroe
import CreateEventForm from '../components/CreateEventForm';

const HomePage: React.FC = () => {
  function ManualClose() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              xd
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  return (
    <Flex>
      {/* División izquierda (oculta en dispositivos móviles) */}
      <Box bg="#050a11" display={{ base: 'none', md: 'block' }} w={{ base: '0%', md: '15%' }} h="100vh"/>
      
      {/* División central */}
      <Box w={{ base: '100%', md: '70%' }} overflowY="auto" h="80vh">
        <ManualClose />
      </Box>
      
      {/* División derecha (oculta en dispositivos móviles) */}
      <Box bg="#050a33" display={{ base: 'none', md: 'block' }} w={{ base: '0%', md: '15%' }} />
    </Flex>
  );


  
};

export default HomePage;
