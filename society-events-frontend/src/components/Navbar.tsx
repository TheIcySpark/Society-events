import { IconButton, Image, useDisclosure } from '@chakra-ui/react';
import { Box, Flex, Text, Button, Stack, Collapse } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import LogoImage from '../assets/images/logo.jpg'; // Importa la imagen del logo
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const authToken = localStorage.getItem('authToken');

  return (
    <Box bg={useColorModeValue('#003459', 'white')} py={{ base: 2 }} px={{ base: 4 }}>
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}>
        <Flex alignItems="center">
          <Image
            borderRadius="full"
            boxSize="70px"
            margin="5px"
            src={LogoImage}
            alt="Society Events Logo"
          />
          {authToken && (
            <>
              <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'} ml="15px">
                HOME
              </Button>
              <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
                Contact US
              </Button>
            </>
          )}
        </Flex>

        <Stack direction={'row'} spacing={6} display={{ base: 'none', md: 'flex' }}>
          <Button as={'a'} fontSize={'md'} fontWeight={400} variant={'link'} href={'/login'} color={"white"}>
            Login
          </Button>
          <Button
            as={'a'}
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            bg={'#2A9D8F'}
            href={'/signUp'} 
            _hover={{
              bg: '#2A9D8F',
            }}>
            Sign Up
          </Button>
          
        </Stack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Toggle Navigation'}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav authToken={authToken} />
      </Collapse>
    </Box>
  );
}

const MobileNav = ({ authToken }: { authToken: string | null }) => {
  
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {!authToken && ( // Mostrar los botones "Home" y "Contact Us" solo si no hay un token de autenticación
        <>
          <MobileNavItem label="HOME" href="#" />
          <MobileNavItem label="Contact US" href="#" />
        </>
      )}
      <MobileNavItem label="Login" href={'/login'} />
      <MobileNavItem label="Sign Up" href={'/signUp'}  />
      
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href?: string;
}
