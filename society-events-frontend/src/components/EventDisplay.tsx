import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

interface EventDetails {
  id: number;
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
}

interface Comment {
  id: number;
  user: number;
  text: string;
  date: string;
}

export default function EventDisplay() {
  const userId = localStorage.getItem("userId") ?? "";

  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [events, setEvents] = useState<EventDetails[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      window.location.href = "/login";
      return;
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    axios
      .get("http://127.0.0.1:8000/Eventlist/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de eventos:", error);
      });
  }, []);

  const fetchEventDetails = async (eventId: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/EventDetail/${eventId}/`
      );
      const eventData = response.data;

      // Convertir las fechas a objetos Date
      const startDate = eventData.start_date ? new Date(eventData.start_date) : "";
      const endDate = eventData.end_date ? new Date(eventData.end_date) : "";

      setSelectedEvent({
        ...eventData,
        startDate,
        endDate,
      });

      fetchComments(eventId); // Obtener comentarios después de los detalles del evento
    } catch (error) {
      console.error("Error al obtener detalles del evento:", error);
    }
  };

  const fetchComments = async (eventId: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/Commentlist/?event_id=${eventId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error al obtener comentarios del evento:", error);
    }
  };

  const postComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post("http://127.0.0.1:8000/Comment/", {
        text: newComment,
        user: userId ? parseInt(userId) : null,
        event: selectedEvent?.id ?? 0,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error al crear el comentario:", error);
    }
  };

  return (
    <Box p={4} m={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack spacing={4} mb={6}>
        <Heading as="h2" size="lg" textAlign="center">
          Event List
        </Heading>
        {events.map((event) => (
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

      {selectedEvent && (
        <>
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Event Details - {selectedEvent.title}
          </Heading>
          <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={6}>
            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Title:</Text>
              <Text>{selectedEvent.title}</Text>
              <Text fontWeight="bold">Description:</Text>
              <Text>{selectedEvent.description}</Text>
              <Text fontWeight="bold">Start Date:</Text>
              <Text>
                {selectedEvent.startDate instanceof Date
                  ? selectedEvent.startDate.toDateString()
                  : selectedEvent.startDate}
              </Text>
              <Text fontWeight="bold">End Date:</Text>
              <Text>
                {selectedEvent.endDate instanceof Date
                  ? selectedEvent.endDate.toDateString()
                  : selectedEvent.endDate}
              </Text>
            </VStack>
            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Location:</Text>
              <Text>{selectedEvent.location}</Text>
            </VStack>
          </Grid>

          <VStack spacing={4} mt={6}>
            <Heading as="h3" size="md">
              Comments
            </Heading>
            <Box w="full" maxH="300px" overflowY="auto" borderWidth="1px" p={4}>
              {comments.map((comment) => (
                <Box
                  key={comment.id}
                  borderBottomWidth="1px"
                  borderBottomColor="gray.200"
                  py={2}
                >
                  <Text fontWeight="bold">{comment.user}</Text>
                  <Text fontSize="sm">{comment.text}</Text>
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
            <Button onClick={postComment} colorScheme="blue">
              Post Comment
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
}
