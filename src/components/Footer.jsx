import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={bgColor} color={textColor} py={6}>
      <Container
        as={Stack}
        maxW="6xl"
        spacing={4}
        justify="center"
        align="center"
      >
        {/* Nombre de la Aplicación */}
        <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("purple.500", "purple.300")}>
          Generador IA
        </Text>

        {/* Redes Sociales */}
        <Stack direction="row" spacing={6}>
          <IconButton
            as="a"
            href="https://facebook.com"
            aria-label="Facebook"
            icon={<FaFacebook />}
            colorScheme="facebook"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="twitter"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="pink"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            colorScheme="linkedin"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as="a"
            href="https://github.com"
            aria-label="GitHub"
            icon={<FaGithub />}
            colorScheme="gray"
            variant="ghost"
            size="lg"
          />
        </Stack>
      </Container>

      {/* Texto de Derechos Reservados */}
      <Box borderTopWidth={1} borderStyle="solid" borderColor={textColor} mt={6}>
        <Container
          as={Stack}
          maxW="6xl" 
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} Generador IA. Todos los derechos reservados.
          </Text>
          <Stack direction="row" spacing={4}>
            <Text as="a" href="#privacidad" fontSize="sm" _hover={{ color: useColorModeValue("purple.500", "purple.300") }}>
              Política de Privacidad
            </Text>
            <Text as="a" href="#terminos" fontSize="sm" _hover={{ color: useColorModeValue("purple.500", "purple.300") }}>
              Términos de Servicio
            </Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
