import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Link
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";


const Navbar = ({ isAuthenticated, user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { name: "Stable Diffusion XL", href: "/stable-diffusion-xl" },
    { name: "Stable Diffusion 3.5", href: "/stable-diffusion-3.5" },
    { name: "MidJourney", href: "/midjourney" },
    { name: "Flux Dev 0.1", href: "/flux-dev" },
  ];

  return (
    <Box bg={bgColor} color={textColor} px={4} shadow="md" position="sticky" top="0" zIndex="10">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Botón para el menú móvil */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Abrir menú"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />

        {/* Links de Menú para pantallas grandes */}
        <HStack spacing={8} alignItems="center">
         <Link href="/">
          <Avatar src="/logo.png"/>
          
        </Link>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: "none", md: "flex" }}
            fontSize="md"
            fontWeight="medium"
          >
            {menuItems.map((item) => (
              <Button
                key={item.name}
                as="a"
                href={item.href}
                variant="ghost"
                _hover={{ color: useColorModeValue("purple.500", "purple.300") }}
              >
                {item.name}
              </Button>
            ))}
          </HStack>
        </HStack>

        {/* Sección derecha con Toggle y Avatar/Inicio de sesión */}
        <Flex alignItems="center">
          {/* Toggle de tema */}
          <IconButton
            size="md"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Cambiar tema"
            onClick={toggleColorMode}
            mr={4}
          />

          {/* Avatar/Inicio de sesión */}
          {isAuthenticated ? (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
                <Avatar size="sm" src={user?.avatar || ""} name={user?.name || "Usuario"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Configuración</MenuItem>
                <MenuDivider />
                <MenuItem>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button colorScheme="purple" size="sm">
              Iniciar Sesión
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Drawer para menú móvil */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="start" mt={8}>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  variant="ghost"
                  w="100%"
                  justifyContent="flex-start"
                  _hover={{ color: useColorModeValue("purple.500", "purple.300") }}
                  onClick={onClose}
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
