// EventDisplay.tsx
import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, ResponsiveValue, Text, Textarea, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface EventDetails {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Comment {
  user: string;
  text: string;
  date: string;
}


export default function EventDisplay() {
  const eventInfo: EventDetails = {
    title: 'Event Title',
    description: 'Event Description',
    startDate: '2022-01-01T00:00:00.000Z',
    endDate: '2022-01-01T00:00:00.000Z',
    location: 'Event Location',
  }

  const dateFlexDirection: ResponsiveValue<'row' | 'column' | undefined> = useBreakpointValue({ base: 'column', md: 'row' });

  const [comments, setComments] = useState<Comment[]>([
    { user: 'Jane Doe', text: 'Great event!', date: new Date().toISOString() },
    // More static comments for demonstration
  ]);
  const [newComment, setNewComment] = useState('');

  // Handle posting a new comment (updating local state for now)
  const postComment = () => {
    if (newComment.trim() === '') return;
    const commentToAdd: Comment = {
      user: 'CurrentUser',
      text: newComment,
      date: new Date().toISOString(),
    };
    setComments((prevComments) => [commentToAdd, ...prevComments]);
    setNewComment('');
  };


  return (
    <Box p={4} m={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Event Details
      </Heading>
      <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6}>
        <VStack align="stretch" spacing={4}>
          <Text fontWeight="bold">Title:</Text>
          <Text>{eventInfo.title}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>{eventInfo.description}</Text>
        </VStack>
        <VStack align="stretch" spacing={4}>
          <Flex direction={dateFlexDirection} gap={4}>
            <Box>
              <Text fontWeight="bold">Start Date:</Text>
              <Text>{eventInfo.startDate}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">End Date:</Text>
              <Text>{eventInfo.endDate}</Text>
            </Box>
          </Flex>
          <Text fontWeight="bold">Location:</Text>
          <Text>{eventInfo.location}</Text>
        </VStack>
      </Grid>

      {/* Comments Section */}
      <VStack spacing={4} mt={6}>
        <Heading as="h3" size="md">Comments</Heading>
        <Box w="full" maxH="300px" overflowY="auto" borderWidth="1px" p={4}>
          {comments.map((comment, index) => (
            <Box key={index} borderBottomWidth="1px" borderBottomColor="gray.200" py={2}>
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
    </Box>
  );
};
