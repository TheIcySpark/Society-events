import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import axios from 'axios'; // Importa Axios

interface EventFormData {
  title: string;
  description: string;
  start_date: string; // Cambiado de startDate a start_date
  end_date: string; // Cambiado de endDate a end_date
  location: string;
}

export default function CreateEventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    start_date: '', // Cambiado de startDate a start_date
    end_date: '', // Cambiado de endDate a end_date
    location: '',
  });

  const toast = useToast(); // Utiliza useToast para obtener la función toast

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Formatea las fechas correctamente antes de enviarlas
      const formattedFormData = {
        ...formData,
        start_date: new Date(formData.start_date).toISOString(), // Formatea la fecha de inicio
        end_date: new Date(formData.end_date).toISOString(), // Formatea la fecha de finalización
      };
  
      // Obtiene el token JWT del almacenamiento local
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Maneja el caso cuando el token no está presente
        console.error('Access token not found.');
        return;
      }

      // Envia los datos del formulario a tu API utilizando Axios
      const response = await axios.post('http://127.0.0.1:8000/CreateEvent/', {
        ...formattedFormData,
        creator: localStorage.getItem('userId'), // Agrega el ID del usuario al formulario
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      // Aquí puedes manejar la respuesta de la API según tus necesidades
      console.log(response.data);
      toast({
        title: 'Form submitted successfully',
        description: 'Event created!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      // Maneja los errores de la API
      console.error('Error submitting form:', error);
      toast({
        title: 'Error submitting form',
        description: 'An error occurred while submitting the form. Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (`0${now.getMonth() + 1}`).slice(-2);
    const day = (`0${now.getDate()}`).slice(-2);
    const hours = (`0${now.getHours()}`).slice(-2);
    const minutes = (`0${now.getMinutes()}`).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Box p={4} m={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Crear evento
      </Heading>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6}>
          <Box>
            <FormControl isRequired>
              <FormLabel htmlFor='title'>Titulo</FormLabel>
              <Input id='title' name='title' value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor='description'>Descripcion</FormLabel>
              <Textarea id='description' name='description' value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
            </FormControl>
          </Box>
          <VStack spacing={4} align="stretch">
            <Flex flexDirection="column" gap={2}>
              <FormControl isRequired>
                <FormLabel htmlFor='start_date'>Fecha de inicio</FormLabel>
                <Input type='datetime-local' id='start_date' name='start_date' value={formData.start_date} onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))} min={getCurrentDateTime()} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='end_date'>Fecha de finalizacion</FormLabel>
                <Input type='datetime-local' id='end_date' name='end_date' value={formData.end_date} onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))} min={formData.start_date} />
              </FormControl>
            </Flex>
            <FormControl isRequired>
              <FormLabel htmlFor='location'>Location</FormLabel>
              <Input id='location' name='location' value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} />
            </FormControl>
          </VStack>
        </Grid>
        <Button type='submit' colorScheme='blue' mt={6}>Submit</Button>
      </form>
    </Box>
  )
}
