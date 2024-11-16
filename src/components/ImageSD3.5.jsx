import { HfInference } from '@huggingface/inference'
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
    useToast,
    HStack,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { DownloadIcon } from '@chakra-ui/icons';

  const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY)

  const ImageGenerationSD3 = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [imageBlob, setImageBlob] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const result = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-3.5-large',
            inputs: prompt,
          });
          console.log(result);
          
          setImageUrl(URL.createObjectURL(result));
          setImageBlob(result)
          toast({
            title: 'Exitos',
            description: "Imagen generada con exito.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Error:', error);
          toast({
            title: 'Error al generar la imagen',
            description: "No se pudo generar la imagen. Intenta nuevamente.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setImageUrl('');
        } finally {
          setLoading(false);
        }
      }


      const handleDownload = () => {
        if (imageBlob) {
          const url = window.URL.createObjectURL(imageBlob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `generated-image-${Date.now()}.png`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      };
    return (
        <Box maxW="4xl" mx="auto" p={6} mt={8} w="100%" minHeight="30em">
            <Box
                p={6}
                borderRadius="lg"
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                boxShadow="lg"
                transition="0.3s"
            >
                <Flex direction="column" align="center">
                    <Heading as="h1" size="lg" mb={4} textAlign="center" color={colorMode === 'light' ? 'gray.800' : 'white'}>
                        Generador de Imágenes con IA Modelo Stable diffusion 3.5
                    </Heading>
                    <Text fontSize="lg" mb={4} color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
                        Ingresa una instrucción para generar una imagen única usando inteligencia artificial.
                    </Text>   
               
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <FormControl isRequired>
                            <FormLabel htmlFor="prompt" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
                                Instruccion de imagen:
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

                            <Button
                            type="submit"
                            colorScheme="blue"
                            w="full"
                            marginTop="1em"
                            isLoading={loading}
                            borderRadius="full"
                            loadingText="Generando..."
                            transition="0.3s"
                            _hover={{ transform: 'scale(1.05)' }}
                            _active={{ transform: 'scale(0.95)' }}
                            >
                            Generar Imagen
                            </Button>
                        </form>
                        {imageUrl && (
                            <Box mt={6} textAlign="center">
                            <Heading as="h2" size="md" mb={4} color={colorMode === 'light' ? 'gray.800' : 'white'}>
                                Imagen Generada:
                            </Heading>
                            <Image src={imageUrl} alt="Generated" className="rounded-md shadow-lg" borderRadius="md" />

                            <HStack justifyContent="center" mt={4}>
                                <Button
                                leftIcon={<DownloadIcon />}
                                colorScheme="blue"
                                onClick={handleDownload}
                                >
                                Descargar Imagen
                                </Button>
                            </HStack>
                            </Box>
                           
                        )}  

                        {loading && (
                            <Box mt={4}>
                            <Spinner size="lg" color="green.500" />
                            </Box>
                        )}
                    </Flex>
            </Box>
        </Box>
    )

  }

  export default ImageGenerationSD3