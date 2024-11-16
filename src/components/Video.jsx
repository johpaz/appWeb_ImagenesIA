import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Heading,
    Text,
    Image,
    Spinner,
    useColorMode,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Select,
    useToast,
  } from '@chakra-ui/react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

const VideoGeneration = () => {
    const [prompt, setPrompt] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [motionType, setMotionType] = useState('Default');
    const [modelType, setModelType] = useState('Default');
    const [inferenceSteps, setInferenceSteps] = useState(4);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
          toast({
            title: 'Error',
            description: "Por favor, ingresa una instrucción válida.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          return;
        }
        
        setLoading(true);
        try {
          const requestBody = {
            data: [
              prompt,
              modelType,
              "guoyww/animatediff-motion-lora-zoom-in",
              inferenceSteps
            ],
            event_data: null,
            fn_index: 0,
            session_hash: "tanir932oq",
            trigger_id: 10
          };
    
          const response = await fetch("https://kingnish-instant-video.hf.space/run/predict?__theme=light", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
    
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
    
          const result = await response.json();
    
          if (result && result.data && result.data.length > 0) {
            const videoUrl = result.data[0].video.url;
            setVideoUrl(videoUrl);
            toast({
              title: 'Video generado',
              description: "Tu video ha sido generado exitosamente.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } else {
            throw new Error('La respuesta no contiene datos de video válidos');
          }
        } catch (error) {
          console.error('Error:', error);
          toast({
            title: 'Error al generar el video',
            description: "No se pudo generar el video. Intenta nuevamente.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setVideoUrl('');
        } finally {
          setLoading(false);
        }
      };


    return (
        <Container maxW="4xl" mx="auto" p={6} mt={8}>
            <Box
                p={6}
                borderRadius="lg"
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                boxShadow="lg"
                transition="0.3s"
            >
                <Flex direction="column" align="center">
                    <Heading as="h1" size="lg" mb={4} textAlign="center" color={colorMode === 'light' ? 'gray.800' : 'white'}>
                        Generador de Videos con IA
                    </Heading>
                    <Text fontSize="lg" mb={4} color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
                        Ingresa una instrucción para generar un video único usando inteligencia artificial.
                    </Text>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <FormControl isRequired>
                        <FormLabel htmlFor="prompt" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
                            Instrucción:
                        </FormLabel>
                        <Input
                            id="prompt"
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Escribe tu descripción aquí..."
                            focusBorderColor="blue.400"
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                            borderColor="gray.300"
                        />
                        </FormControl>
                        <FormControl isRequired>
                    <FormLabel htmlFor="modelType" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
                        Tipo de Modelo:
                    </FormLabel>
                    <Select
                        id="modelType"
                        value={modelType}
                        onChange={(e) => setModelType(e.target.value)}
                        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                        color={colorMode === 'light' ? 'gray.800' : 'white'}
                        borderColor="gray.300"
                    >
                        <option value="Anime">Anime</option>
                        <option value="Cartoon">Cartoon</option>
                        <option value="Realistic">Realistic</option>
                        <option value="3d">3D</option>
                        
                    </Select>
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel htmlFor="motionType" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
                        Movimiento:
                        </FormLabel>
                        <Select
                            id="motionType"
                            value={motionType}
                            onChange={(e) => setMotionType(e.target.value)}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                            borderColor="gray.300"
                        >                   
                            <option value="Motion">Motion</option>
                            <option value="Zoom in">Zoom in</option>
                            <option value="Zoom out">Zoom out</option>
                            <option value="Tilt up">Tilt up</option>
                            <option value="Tilt down">Tilt down</option>
                            <option value="Pan left">Pan left</option>
                            <option value="Pan right">Pan right</option>
                            <option value="Roll left">Roll left</option>
                            <option value="Roll right">Roll right</option>
                        </Select>
                        </FormControl>

                        <FormControl isRequired>
                        <FormLabel htmlFor="inferenceSteps" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
                            Pasos de Inferencia:
                        </FormLabel>
                        <Select
                            id="inferenceSteps"
                            value={inferenceSteps}
                            onChange={(e) => setInferenceSteps(Number(e.target.value))}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                            borderColor="gray.300"
                        >
                            <option value={1}>1 Paso</option>
                            <option value={2}>2 Pasos</option>
                            <option value={4}>4 Pasos</option>
                            <option value={8}>8 Pasos</option>
                        </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            w="full"
                            margin="1em"
                            isLoading={loading}
                            loadingText="Generando..."
                            transition="0.3s"
                            _hover={{ transform: 'scale(1.05)' }}
                            _active={{ transform: 'scale(0.95)' }}
                            isDisabled={loading} // Deshabilitar si está cargando
                            >
                            Generar Video
                        </Button>
                </form>
                {videoUrl && (
                        <Box mt={6} textAlign="center">
                        <Heading as="h2" size="md" mb={4} color={colorMode === 'light' ? 'gray.800' : 'white'}>
                            Video Generado:
                        </Heading>
                        <video width="100%" controls>
                            <source src={videoUrl} type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                        </Box>
                    )}

                    {loading && <Spinner size="lg" mt={4} />}
                </Flex>
            </Box>
        </Container>
    )
}

export default VideoGeneration;