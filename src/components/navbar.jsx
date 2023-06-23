import { Button, Flex, Heading, HStack, Text, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const {username, imgProfile} = useSelector(state => state.user.authValue)

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/log-in")
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
            _hover={{color: 'orange'}}
            >
                MY BLOG
            </Heading>

            <Link to="/">
                <Text
                color='white'
                _hover={{color: 'orange'}}
                >
                    HOME
                </Text>
            </Link>

            <Link to="/advanced-search">
                <Text
                color='white'
                _hover={{color: 'orange'}}
                >
                    SEARCH
                </Text>
            </Link>

            {token ? (
                <Link to="/create-blog">
                <Text
                color='white'
                _hover={{color: 'orange'}}
                >
                    CREATE
                </Text>
                </Link>
            ) : (
                <Link to="/log-in">
                <Text
                color='white'
                _hover={{color: 'orange'}}
                >
                    CREATE
                </Text>
                </Link>
            )}
        </Flex>

        <Flex 
        gap='1rem' 
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
                    _hover={{bg:'orange'}}
                    onClick={() => navigate("/user-settings")}
                    >
                        Settings
                    </Button>
                    <Button
                    _hover={{bg:'orange'}}
                    onClick={logout}
                    >
                        Log out
                    </Button>
                    </>
                ) : (
                    <>
                    <Button _hover={{bg:'orange'}} onClick={() => navigate("/log-in")} >Log In</Button>
                    <Button _hover={{bg:'orange'}} onClick={() => navigate("/sign-up")} >Sign Up</Button>
                    </>
                )
            }
        </Flex>
        
    </HStack>
    )
}