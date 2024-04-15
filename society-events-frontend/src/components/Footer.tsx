// Footer.tsx
import React from 'react';
import { Flex, Box, Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Box>
        <Text fontSize="lg">¡Únete a nosotros para crear un cambio positivo en la comunidad!</Text>
      </Box>

      <Box>
        <Link mr={4} href="#">
          Términos de Servicio
        </Link>
        <Link mr={4} href="#">
          Política de Privacidad
        </Link>
        <Link mr={4} href="#">
          Contáctanos
        </Link>
      </Box>
    </Flex>
  );
};

export default Footer;
