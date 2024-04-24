// Footer.tsx
import React from 'react';
import { Flex, Box, Text, Link, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, ListItem, List } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();

  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#22333B"
      color="white"
    >
      <Box>
        <Text fontSize="lg">¡Join us to create positive change in the community!</Text>
      </Box>

      <Box>
        <Link mr={4} onClick={onOpen1} cursor="pointer">
          Terms of Service
        </Link>
        <Link mr={4} onClick={onOpen2} cursor="pointer">
          Privacy Policy
        </Link>
        <Link mr={4} onClick={onOpen3} cursor="pointer">
          Contact us
        </Link>
      </Box>

      {/* Diálogo Términos de Servicio */}
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent bg="#050a11" color="white">
          <ModalHeader>Terms of Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Welcome to our social events platform. By using our services, you agree to the following terms and conditions:</Text>
            <List styleType="decimal" ml={6} mt={4}>
              <ListItem>
                <Text>Registration: To participate in our events, you must register on our platform using a valid email address.</Text>
              </ListItem>
              <ListItem>
                <Text>Acceptable Use: You agree to use our services in an ethical and legal manner. Inappropriate behavior, discrimination or any illegal activity will not be tolerated.</Text>
              </ListItem>
              <ListItem>
                <Text>Intellectual Property: All intellectual property rights related to our platform and its contents belong to us. You may not use our content without our prior written consent.</Text>
              </ListItem>
              <ListItem>
                <Text>Limitation of Liability: We strive to provide reliable service, but we cannot guarantee the availability or accuracy of information at all times. We will not be liable for any direct, indirect, incidental, special or consequential damages arising out of the use of our service.</Text>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme="blue" mr={3} onClick={onClose1}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Diálogo Política de Privacidad */}
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent bg="#050a11" color="white">
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Text>Your privacy is important to us. On our platform, we collect and use certain personal information to provide and improve our services. Here we explain how we handle your data:</Text>
            <List styleType="decimal" ml={6} mt={4}>
              <ListItem>
                <Text>Information Collected: We collect personal information such as your name, email address and event preferences when you register on our platform.</Text>
              </ListItem>
              <ListItem>
                <Text>Use of Information: We use your information to administer your account, process your event requests and communicate with you about our services and related events.</Text>
              </ListItem>
              <ListItem>
                <Text>Disclosure of Information: We will not share your personal information with third parties without your consent, except as necessary to provide our services or comply with legal requirements.</Text>
              </ListItem>
              <ListItem>
                <Text>Data Security: We take measures to protect your personal data against unauthorized access, alteration, disclosure or destruction.</Text>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose2}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Diálogo Contactanos */}
      <Modal isOpen={isOpen3} onClose={onClose3}>
      <ModalOverlay />
      <ModalContent bg="#050a11" color="white">
        <ModalHeader>Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Do you have any questions or comments?</Text>
          <Text>You can contact us in the following ways:</Text>
          <Box mt={4}>
            <Text fontWeight="bold">E-mail:</Text>
            <Text>saacmanjarrez@gmail.com</Text>
          </Box>
          <Box mt={4}>
            <Text fontWeight="bold">Phone:</Text>
            <Text>+52 1 712 164 4458</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose3}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

      <Box>
        <Text fontSize="sm">© 2024 SocityEvents. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
