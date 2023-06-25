import { Button, Flex, Heading, HStack, Text, Avatar, Icon } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosCreate, IoPersonSharp, Iologout } from "react-icons/io";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

export default function Navbar() {
    const {imgProfile} = useSelector(state => state.user.authValue)

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
    <HStack
    w='100vw'
    h='13vh'
    bgColor='black'
    position='sticky'
    top='0'
    padding='1rem'
    justifyItems='center'
    marginBottom='2rem'
    overflowX='hidden'
    zIndex='2'
    >

        <Flex
        w='50%'
        alignItems='center'
        gap='3rem'
        >
            <Heading
            size='xl'
            fontWeight='bold'
            color='white'
            _hover={{color: 'green.500'}}
            >
                MY BLOG
            </Heading>

            <Link to="/">
                {/* <Text
                color='white'
                _hover={{color: 'green.500'}}
                >
                    HOME
                </Text> */}
                <Icon as={FaHome} w='7' h='7' color={'white'} _hover={{color: 'green.500'}} />
            </Link>

            <Link to="/advanced-search">
                {/* <Text
                color='white'
                _hover={{color: 'green.500'}}
                >
                    SEARCH
                </Text> */}
                <Icon as={FaSearch} w='7' h='7' color={'white'} _hover={{color: 'green.500'}} />
            </Link>

            {token ? (
                <Link to="/create-blog">
                {/* <Text
                color='white'
                _hover={{color: 'green.500'}}
                >
                    CREATE
                </Text> */}
                <Icon as={IoIosCreate} w='7' h='7' color={'white'} _hover={{color: 'green.500'}} />
                </Link>
            ) : (
                <Link to="/log-in">
                {/* <Text
                color='white'
                _hover={{color: 'green.500'}}
                >
                    CREATE
                </Text> */}
                <Icon as={IoIosCreate} w='7' h='7' color={'white'} _hover={{color: 'green.500'}} />
                </Link>
            )}
        </Flex>

        <Flex 
        gap='1.5rem' 
        justifyContent='flex-end'
        alignItems='center'
        w='50%'
        >
            {
                token? (
                    <>
                    <Avatar
                    src={`https://minpro-blog.purwadhikabootcamp.com/${imgProfile}`}
                    />
                    <Button
                    rightIcon={<Icon as={GoPerson} w='7' h='7' color={'black'} _hover={{color: 'green.500'}} />}
                    _hover={{bg:'green.500', color:'white'}}
                    onClick={() => navigate("/blogs")}
                    >
                        Profile
                    </Button>
                    <Button
                    rightIcon={<Icon as={LuLogOut} w='7' h='7' color={'black'} _hover={{color: 'green.500'}} />}
                    _hover={{bg:'green.500', color:'white'}}
                    onClick={logout}
                    >
                        Log out   
                        {/* <Icon as={LuLogOut} w='7' h='7' color={'black'} _hover={{color: 'green.500'}} /> */}
                    </Button>
                    </>
                ) : (
                    <>
                    <Button 
                    rightIcon={<Icon as={LuLogIn} w='7' h='7' color={'black'} _hover={{color: 'green.500'}} />}
                    _hover={{bg:'green.500', color:'white'}} 
                    onClick={() => navigate("/log-in")} 
                    >Log In
                    </Button>
                    <Button 
                    _hover={{bg:'green.500', color:'white'}} 
                    onClick={() => navigate("/sign-up")} 
                    >Sign Up
                    </Button>
                    </>
                )
            }
        </Flex>
        
    </HStack>
    )
}