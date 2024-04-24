import React, { ReactNode, useState } from 'react';
import { Box, Card, CardBody, CardHeader, ChakraProvider, Divider, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaHandsHelping, FaTree, FaUsers, FaUsersCog } from 'react-icons/fa';

// Define la interfaz de las props si planeas recibir la prop isLoggedIn
interface LandingPageProps {
    isLoggedIn: boolean;
}

interface BenefitCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

const LandingPage: React.FC = () => {

    return (
        <ChakraProvider>
            <Navbar />
            <Box bg="#050a11" p={{ base: 4, md: 8 }} color="white">
                <Box mx="auto" textAlign="center">
                    <Heading size="lg" bgGradient="linear(to-b, #93ffa1, #83C5BE)"
                        bgClip="text" fontSize={{ base: "50px", md: "100px" }} mb={4}>
                        Society Events
                    </Heading>
                    <Text fontSize={{ base: "xl", md: "2xl" }} as="em" style={{ textAlign: "justify" }}>
                        Join us to create a positive impact in your community. Organize and participate in social events that make a difference.
                    </Text>
                </Box>
                <Divider marginTop="10px" marginBottom="10px" />
                <Box mx="auto" textAlign="center">
                    <Heading as="h2" size="lg" textAlign="center" mb={8}>
                        Why Choose Our Platform?
                    </Heading>
                    <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap={4}>
                        <BenefitCard icon={<FaUsers />} title="Facilitates Social Events">
                            Our platform makes it easy to organize and participate in social events, bringing communities together.
                        </BenefitCard>
                        <BenefitCard icon={<FaHandsHelping />} title="Encourages Participation">
                            We encourage active participation from community members, fostering a sense of belonging and engagement.
                        </BenefitCard>
                        <BenefitCard icon={<FaTree />} title="Promotes Environmental Care">
                            We're committed to promoting care for the environment and society through our platform's initiatives.
                        </BenefitCard>
                        <BenefitCard icon={<FaUsersCog />} title="Connects People">
                            Our platform connects people with similar interests, facilitating meaningful connections and collaborations.
                        </BenefitCard>
                    </Flex>
                </Box>
                <Divider marginTop="10px" marginBottom="10px" />
                <Box  mx="auto" >
                    <Heading textAlign="center" mb={8}>Types of Events</Heading>
                    <Flex justify="center" align="center" wrap="wrap">
                        <EventTypeCard icon="🌳" title="Reforestations">
                            Reforests green areas and helps preserve the environment.
                        </EventTypeCard>
                        <EventTypeCard icon="🗑️" title="Garbage Cleanup">
                            Help keep our communities and public spaces clean.
                        </EventTypeCard>
                        <EventTypeCard icon="🥫" title="Food Donations">
                            Contribute to feed people in need in your community.
                        </EventTypeCard>
                        <EventTypeCard icon="👵" title="Support for the Elderly">
                            Provide support and companionship to elderly people in your area.
                        </EventTypeCard>
                        <EventTypeCard icon="📚" title="Educational Activities">
                            Organizes educational activities to promote learning and development.
                        </EventTypeCard>
                    </Flex>
                </Box>
            </Box>
            <Footer />
        </ChakraProvider>
    );
};

const BenefitCard = ({ icon, title, children }: BenefitCardProps) => {
    return (
        <Box bg="#006D77" p={6} borderRadius="lg" boxShadow="md" maxW="300px" textAlign="center">
            <Box fontSize="3xl" color="#93ffa1" mb={4}>
                {icon}
            </Box>
            <Heading as="h3" size="md" mb={4}>
                {title}
            </Heading>
            <Text fontSize="md">{children}</Text>
        </Box>
    );
};

const EventTypeCard = ({ icon, title, children } : BenefitCardProps) => {
    return (
      <Box
        bg="#386641"
        borderRadius="lg"
        boxShadow="md"
        p={6}
        m={4}
        textAlign="center"
        w={{ base: "90%", md: "45%" }}
      >
        <Box fontSize="3xl" mb={4}>
          {icon}
        </Box>
        <Heading as="h3" size="md" mb={4}>
          {title}
        </Heading>
        <Text fontSize="md">{children}</Text>
      </Box>
    );
  };
export default LandingPage;
