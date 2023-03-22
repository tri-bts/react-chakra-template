import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher/index';
import NavLink from './NavLink/index';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
  { id: '1', label: 'Dashboard', route: '/' },
  { id: '2', label: 'Jadwal', route: '/jadwal' },
  { id: '3', label: 'Silsilah Keluarga', route: '/silsilah-keluarga' },
  { id: '4', label: 'Form Unik', route: '/form-unik' },
  { id: '5', label: 'Formula Generator', route: '/formula' },
  { id: '6', label: 'Form Canggih', route: '/form-canggih' },
  { id: '7', label: 'Tabel', route: '/tabel' },
  { id: '8', label: 'Informasi', route: '/informasi' },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div style={{ height: '50px' }}>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link.id} label={link.label} route={link.route} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <div style={{ marginRight: 8 }}>
              <ColorModeSwitcher />
            </div>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link.id} label={link.label} route={link.route} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </div>
  );
};

export default Header;
