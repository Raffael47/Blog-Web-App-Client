import { Stack, Image, Heading, HStack, Button, Flex, Icon, Center, Box, Avatar, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai";
import Footer from "./footer";
import { ArrowRightIcon } from "@chakra-ui/icons";

export const MyArticle = () => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [blogPage, setBlogPage] = useState(1)
    const [blog, setBlog] = useState({})

    const navigate = useNavigate()

    const {sortDate} = require("../functions/date")

    const getData = async(value) => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser?page=${value}`, {
                headers: {
                    Authorization: `Bearer: ${token}`
                }
            })
            setBlog(data)
            setData(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async(value) => {
        try {
            await axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${value}`, {}, {
                headers: {
                    Authorization: `Bearer: ${token}`
                }
            })
            getData()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData(blogPage)
    }, [blogPage])

    return (
        <Stack
        overflow='hidden'
        w='100%'>
            <Heading
            alignSelf={'center'}
            mb={'0'}
            >
                My Articles
            </Heading>
            <Flex
            flexWrap='wrap'
            w='100%'
            h='100%'
            padding='3rem'
            gap='2rem'
            justifyContent='center'
            >
                {data.map(({id, title, imageURL, User, Category, createdAt }) => {
                    return (
                        <Center py={6}>
                            <Box
                                key={id}
                                // maxW={'445px'}
                                w={'250px'}
                                h={'500px'}
                                bg={"gray.900"}
                                boxShadow={'2xl'}
                                borderRadius='10px'
                                p={6}
                                overflow={'hidden'}>
                                <Box
                                bg={'green.500'}
                                border='1px solid white'
                                borderRadius='10px'
                                mb={6}
                                pos={'relative'}
                                onClick={() => navigate(`/blog-detail/${id}`)}>
                                <Image
                                    borderRadius='10px'
                                    src={
                                    `https://minpro-blog.purwadhikabootcamp.com/${imageURL}`
                                    }
                                    boxSize='210px'
                                />
                                </Box>
                                <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    {Category.name}
                                </Text>
                                <Heading
                                    color={"white"}
                                    fontSize={'xl'}
                                    fontFamily={'body'}>
                                    {title}
                                </Heading>
                                </Stack>
                                <Stack mt='1rem' direction={'row'} spacing={4} align={'center'}>
                                <Avatar
                                    src={`https://minpro-blog.purwadhikabootcamp.com/${User.imgProfile}`}
                                    alt={'Author'}
                                />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text color={'gray.500'} fontWeight={600}>{User.username}</Text>
                                    <Text color={'gray.500'}>{sortDate(createdAt)}</Text>
                                </Stack>
                                </Stack>
                                <Button
                                onClick={() => deletePost(id)}
                                _hover={{bgColor:'red'}}
                                w='20px'
                                h='40px'
                                position='relative'
                                top='1rem'
                                left='5rem'
                                marginTop='1rem'
                                >
                                    <Icon _hover={{color: 'white'}} as={AiFillDelete} w='5' h ='5' />
                                </Button>
                            </Box>
                        </Center>
                    )
                })}
            </Flex>
            
            <HStack
            justifyContent='center'
            gap='1rem'
            >
                {
                    blogPage === 1 ? null : (
                        <Button
                        onClick={() => setBlogPage(blogPage - 1)}
                        >
                            Prev
                        </Button>
                    )
                }
                
                {
                    blog.page === 0 ? (
                        <Heading
                        position={'relative'}
                        bottom='180px'>
                            You haven't posted any blogs yet
                        </Heading>
                    ) : (
                        <Heading
                        size='sm'
                        >
                            {blogPage}
                        </Heading>
                    )
                }

                {
                    blog.page === 0 ? null : blogPage === blog.page ? null : (
                        <Button
                        onClick={() => setBlogPage(blogPage + 1)}
                        >
                            <Icon as={ArrowRightIcon} w='5' h='5' color={'black'} _hover={{bgColor:'green.500'}} />
                        </Button>
                    )
                    
                }
            </HStack>

        </Stack>
    )
}