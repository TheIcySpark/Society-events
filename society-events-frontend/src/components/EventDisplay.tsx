import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Text, Textarea, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface EventDetails {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

export default function EventDisplay() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Obtener la lista de eventos
    axios.get('http://127.0.0.1:8000/Eventlist/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de eventos:', error);
      });
  }, []);

  const fetchEventDetails = async (eventId: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/EventDetail/${eventId}/`);
      setSelectedEvent(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del evento:', error);
    }
  };

  const fetchComments = async (eventId: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Commentlist/?event_id=${eventId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error al obtener comentarios del evento:', error);
    }
  };

  const postComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/Comment/', { text: newComment });
      console.log('Comentario creado:', response.data);
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error al crear el comentario:', error);
    }
  };

  return (
    <Box p={4} m={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      {/* Event List */}
      <VStack spacing={4} mb={6}>
        <Heading as="h2" size="lg" textAlign="center">
          Event List
        </Heading>
        {events.map(event => (
          <Button
            key={event.id}
            colorScheme="blue"
            onClick={() => {
              fetchEventDetails(event.id);
              fetchComments(event.id);
            }}
          >
            {event.title}
          </Button>
        ))}
      </VStack>

      {/* Event Details and Comments */}
      {selectedEvent && (
        <>
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Event Details - {selectedEvent.title}
          </Heading>
          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6}>
            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Title:</Text>
              <Text>{selectedEvent.title}</Text>
              <Text fontWeight="bold">Description:</Text>
              <Text>{selectedEvent.description}</Text>
            </VStack>
            <VStack align="stretch" spacing={4}>
              <Flex direction="row" gap={4}>
                <Box>
                  <Text fontWeight="bold">Start Date:</Text>
                  <Text>{selectedEvent.startDate}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">End Date:</Text>
                  <Text>{selectedEvent.endDate}</Text>
                </Box>
              </Flex>
              <Text fontWeight="bold">Location:</Text>
              <Text>{selectedEvent.location}</Text>
            </VStack>
          </Grid>

          {/* Comments Section */}
          <VStack spacing={4} mt={6}>
            <Heading as="h3" size="md">Comments</Heading>
            <Box w="full" maxH="300px" overflowY="auto" borderWidth="1px" p={4}>
              {comments.map(comment => (
                <Box key={comment.id} borderBottomWidth="1px" borderBottomColor="gray.200" py={2}>
                  <Text fontWeight="bold">{comment.user}</Text>
                  <Text fontSize="sm">{comment.text}</Text>
                  <Text fontSize="xs">{new Date(comment.date).toLocaleString()}</Text>
                </Box>
              ))}
            </Box>

            <FormControl>
              <FormLabel htmlFor="new-comment">Add a new comment</FormLabel>
              <Textarea
                id="new-comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a new comment..."
              />
            </FormControl>
            <Button onClick={postComment} colorScheme="blue">Post Comment</Button>
          </VStack>
        </>
      )}
    </Box>
  );
}
