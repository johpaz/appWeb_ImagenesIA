import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Spinner,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaMagic, FaCloudUploadAlt, FaPaintBrush } from "react-icons/fa";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const buttonColor = useColorModeValue("purple.500", "purple.200");
  const toast = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "El prompt no puede estar vacío.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setImage(null);

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/YOUR_MODEL", {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_TOKEN`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        throw new Error("Error al generar la imagen");
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);
      setImage(imageUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg={bgColor} color={textColor} minH="100vh" p={8}>
      {/* Encabezado y descripción */}
      <VStack spacing={6} maxW="800px" mx="auto" textAlign="center">
        <Heading size="2xl" color={buttonColor}>
          Generador de Imágenes con IA
        </Heading>
        <Text fontSize="lg">
          Convierte tus ideas en impresionantes imágenes con tecnología de inteligencia artificial. 
          Ingresa un texto, deja que la IA haga su magia y explora las infinitas posibilidades.
        </Text>
      </VStack>

      {/* Tarjetas de presentación */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={12} maxW="1200px" mx="auto">
        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="lg"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          p={4}
        >
          <CardBody>
            <Icon as={FaMagic} boxSize={10} color={buttonColor} />
            <Heading size="md" mt={4}>
              Generación Instantánea
            </Heading>
            <Text mt={2}>
              Obtén resultados en cuestión de segundos. La tecnología más avanzada al alcance de tus manos.
            </Text>
          </CardBody>
        </Card>

        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="lg"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          p={4}
        >
          <CardBody>
            <Icon as={FaCloudUploadAlt} boxSize={10} color={buttonColor} />
            <Heading size="md" mt={4}>
              Acceso desde la nube
            </Heading>
            <Text mt={2}>
              Sin necesidad de instalación. Todo funciona directamente desde tu navegador.
            </Text>
          </CardBody>
        </Card>

        <Card
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="lg"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          p={4}
        >
          <CardBody>
            <Icon as={FaPaintBrush} boxSize={10} color={buttonColor} />
            <Heading size="md" mt={4}>
              Personalización Total
            </Heading>
            <Text mt={2}>
              Ajusta tus ideas y crea imágenes únicas que se adapten a tu visión creativa.
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Generación de imágenes */}
      <VStack spacing={6} maxW="600px" mx="auto" textAlign="center" mt={12}>
        <Heading size="lg" color={buttonColor}>
          Genera tu Imagen
        </Heading>
        <Input
          placeholder="Escribe un prompt para la IA..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          focusBorderColor="purple.500"
          size="lg"
        />
        <Button
          colorScheme="purple"
          onClick={generateImage}
          isLoading={loading}
          loadingText="Generando..."
        >
          Generar Imagen
        </Button>
        {loading && <Spinner size="lg" />}
        {image && (
          <Box boxShadow="lg" rounded="md" overflow="hidden">
            <Image src={image} alt="Generated" maxW="100%" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Home;
