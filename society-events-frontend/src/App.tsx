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
import SignUpForm from "./components/SignUpForm"


export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/createEvent" element={<CreateEventForm />} />
      <Route path="/event" element={<EventDisplay />} />
      <Route path="/signUp" element={<SignUpForm />} />
    </Routes>
  </ChakraProvider>
)
