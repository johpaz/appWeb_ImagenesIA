import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  Heading,
  Text,
  Spinner,
  Image,
  useColorMode,
  Flex,
  Container,
} from '@chakra-ui/react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const TextGeneration = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // Para almacenar múltiples mensajes
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode(); // Maneja el tema claro/oscuro
  const [output, setOutput] = useState('');

  // Función para la API streaming
  const handleStreamingAPI = async () => {
    if (!input.trim()) {
      alert('Por favor, escribe una pregunta antes de enviar.');
      return;
    }

    setLoading(true);
    setOutput(''); // Limpiar salida previa

    const newMessage = { pregunta: input, respuesta: '' };
    setMessages((prev) => [...prev, newMessage]);

    try {
      let streamedOutput = '';
      for await (const chunk of hf.chatCompletionStream({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [{ role: 'user', content: input }],
        max_tokens: 1000,
        temperature: 0.1,
        seed: 0,
      })) {
        if (chunk.choices && chunk.choices.length > 0) {
          streamedOutput += chunk.choices[0].delta.content;
          setOutput(streamedOutput); // Actualización en tiempo real
        }
      }
      // Actualizar la respuesta final
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].respuesta = streamedOutput;
        return updated;
      });
    } catch (error) {
      console.error('Error with streaming API:', error);
      setOutput('Error procesando tu solicitud.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <Container maxW="3xl" mx="auto" p={6} mt={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg" color={colorMode === 'light' ? 'gray.800' : 'white'}>
          Generador de Texto con IA
        </Heading>
      </Flex>
      <Box
        p={6}
        borderWidth={1}
        borderRadius="lg"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        boxShadow="md"
        transition="0.3s"
      >
        <Box textAlign="center" mb={6}>
          <Image
            src="/logo.png" // Cambia esta URL por una imagen relevante
            alt="Imagen de IA"
            mx="auto"
            borderRadius="md"
            w="10em"
            mb={4}
          />
          <Text fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>
            ¡Descubre el poder de la inteligencia artificial en tus manos!
          </Text>
        </Box>

        {/* Mostrar mensajes generados */}
        {messages.map((msg, index) => (
          <Box
            key={index}
            mt={8}
            p={4}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            borderRadius="md"
            borderWidth={1}
          >
            <Heading as="h2" size="md" mb={2} color={colorMode === 'light' ? 'gray.800' : 'white'}>
              Pregunta:
            </Heading>
            <Text fontSize="md" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              {msg.pregunta}
            </Text>
            <Heading as="h2" size="md" mt={4} mb={2} color={colorMode === 'light' ? 'gray.800' : 'white'}>
              Respuesta Generada:
            </Heading>
            <Text fontSize="md" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
              {msg.respuesta || (index === messages.length - 1 && loading ? 'Generando respuesta...' : '')}
            </Text>
          </Box>
        ))}

        {/* Entrada de texto */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta o mensaje aquí..."
          size="s"
          rows={6}
          focusBorderColor="blue.500"
          bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
          color={colorMode === 'light' ? 'gray.800' : 'gray.200'}
          isRequired
          aria-label="Escribe tu pregunta o mensaje aquí"
          transition="0.3s"
        />

        {/* Botón para enviar */}
        <Button
          onClick={handleStreamingAPI}
          colorScheme="blue"
          w="full"
          borderRadius="full"
          isLoading={loading}
          loadingText="Generando..."
          size="lg"
          mt={4}
          transition="0.3s"
          _hover={{ transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
        >
          Generar Respuesta
        </Button>
      </Box>
    </Container>
  );
};

export default TextGeneration;
