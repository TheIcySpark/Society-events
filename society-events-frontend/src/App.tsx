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


export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  </ChakraProvider>
)
