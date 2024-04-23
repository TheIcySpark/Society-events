import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Login from "./components/Login"
import { Route, Router, Routes } from "react-router-dom"
import CreateEventForm from "./components/CreateEventForm"
import EventDisplay from "./components/EventDisplay"
import SignUpForm from "./components/SignUp"
import LandingPage from './components/LandingPage';
import HomePage from "./pages/HomePage"

export const App = () => (
  <ChakraProvider theme={theme}>
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createEvent" element={<CreateEventForm />} />
      <Route path="/event" element={<EventDisplay />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/homePage" element={<HomePage />} />
    </Routes>
  </ChakraProvider>
)
