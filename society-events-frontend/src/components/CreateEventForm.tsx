import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, Heading, Input, ResponsiveValue, Textarea, useBreakpointValue, useToast, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export default function CreateEventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you would typically send your form data to a server or perform some other action.
    toast({
      title: 'Form submitted',
      description: JSON.stringify(formData, null, 2),
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  // Get current date and time in YYYY-MM-DDTHH:MM format for the min attribute
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (`0${now.getMonth() + 1}`).slice(-2); // month is 0-indexed
    const day = (`0${now.getDate()}`).slice(-2);
    const hours = (`0${now.getHours()}`).slice(-2);
    const minutes = (`0${now.getMinutes()}`).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const dateInputFlexDirection: ResponsiveValue<'row' | 'column' | undefined> = useBreakpointValue({ base: 'column', md: 'row' });

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
              <Input id='title' name='title' value={formData.title} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor='description'>Descripcion</FormLabel>
              <Textarea id='description' name='description' value={formData.description} onChange={handleChange} />
            </FormControl>
          </Box>
          <VStack spacing={4} align="stretch">
            <Flex flexDirection={dateInputFlexDirection} gap={2}>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor='startDate'>Fecha de inicio</FormLabel>
                <Input type='datetime-local' id='startDate' name='startDate' value={formData.startDate} onChange={handleChange} min={formData.startDate} />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor='endDate'>Fecha de finalizacion</FormLabel>
                <Input type='datetime-local' id='endDate' name='endDate' value={formData.endDate} onChange={handleChange} min={formData.startDate} />
              </FormControl>
            </Flex>
            <FormControl isRequired>
              <FormLabel htmlFor='location'>Location</FormLabel>
              <Input id='location' name='location' value={formData.location} onChange={handleChange} />
            </FormControl>
          </VStack>
        </Grid>
        <Button type='submit' colorScheme='blue' mt={6}>Submit</Button>
      </form>
    </Box>
  )
}