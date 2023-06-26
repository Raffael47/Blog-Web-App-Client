import { ChangePassword } from "../components/change-password"
import { ChangeProfile } from "../components/update-profile"
import { Avatar, Box, Flex, Stack, Text, Button, Icon } from "@chakra-ui/react";
import Navbar from "../components/navbar"
import { MyArticle } from "../components/my-article";
import { LikedArticle } from "../components/liked-article";
import { useSelector } from "react-redux";
import Footer from "../components/footer";
import { BsFillKeyFill, BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

export const UserSettings = () => {

    const {username, imgProfile} = useSelector(state => state.user.authValue)

    return (
        <Stack
        overflowX='hidden'
        >
        <Navbar/>

        <Flex
        w='100vw'>
            <Flex
            w='35%'
            h='400px'
            justifyContent={'center'}
            gap='0.4rem'>
                <Stack
                w='25vw'
                padding='1rem'
                borderRadius='10px'
                bgColor={'gray.900'}
                color='white'
                justifyContent={'center'}
                gap='1rem'
                >
                    <Stack
                    w='100%'
                    alignItems={'center'}>
                        <Avatar size='2xl' src={`https://minpro-blog.purwadhikabootcamp.com/${imgProfile}`} />
                        <Text
                        fontSize='25px'
                        fontWeight={'bold'}>
                            {username}
                        </Text>
                    </Stack>
                    <Button
                        leftIcon={<Icon as={BsPencilSquare} />}
                    _hover={{bgColor:"green.500", color:'white'}}>
                        My Articles
                    </Button>
                    <Button
                    leftIcon={<Icon as={FaRegHeart} />}
                    _hover={{bgColor:"green.500", color:'white'}}>
                        Liked Articles
                    </Button>
                    <Button
                    leftIcon={<Icon as={BsFillPersonFill} />}
                    _hover={{bgColor:"green.500", color:'white'}}>
                        Update Profile
                    </Button>
                    <Button
                    leftIcon={<Icon as={BsFillKeyFill} />}
                    _hover={{bgColor:"green.500", color:'white'}}>
                        Change Password
                    </Button>
                </Stack>
            </Flex>

            <Flex
            w= '65%'
            >
            {/* <ChangeProfile/> */}
            {/* <ChangePassword/> */}
            {/* <MyArticle/> */}
            <LikedArticle/>
                
            </Flex>
        </Flex>

        <Footer/>

        </Stack>
    )
}