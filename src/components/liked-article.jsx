import { Stack, Image, Heading, HStack, Button, Flex, Icon, Center, Box, Avatar, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "./footer";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const LikedArticle = () => {

    const {sortDate} = require("../functions/date")

    const token = localStorage.getItem("token")
    const [likedBlog, setLikedBlog] = useState([])
    const [blogPage, setBlogPage] = useState(1)
    const [blog, setBlog] = useState({})

    const navigate = useNavigate()


    const getLikedBlog = async(value) => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike?page=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
            setBlog(data)
            setLikedBlog(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLikedBlog(blogPage)
    }, [blogPage])

    return (
        <Stack
        overflow='hidden'
        w='100%'>
            <Heading
            alignSelf={'center'}
            >
                Liked Articles
            </Heading>
            <Flex
            flexWrap='wrap'
            w='100%'
            h='100%'
            padding='3rem'
            gap='2rem'
            justifyContent='center'
            >
                {likedBlog.map(({BlogId, Blog, createdAt }) => {
                    return (
                        <Center py={6}>
                            <Box
                                key={BlogId}
                                w={'250px'}
                                h={'200px'}
                                bg={"gray.900"}
                                boxShadow={'2xl'}
                                borderRadius='10px'
                                p={6}
                                overflow={'hidden'}
                                onClick={() => navigate(`/blog-detail/${BlogId}`)}>
                                <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    {Blog.Category.name}
                                </Text>
                                <Heading
                                    color={"white"}
                                    fontSize={'lg'}
                                    fontFamily={'body'}>
                                    {Blog.title}
                                </Heading>
                                </Stack>
                                <Text mt='1rem' color={'gray.500'}>
                                    {sortDate(createdAt)}
                                </Text>
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
                        _hover={{bgColor:'green.500', color:'white'}}
                        >
                            <Icon as={ArrowLeftIcon} w='5' h='5' />
                        </Button>
                    )
                }
                
                {
                    blog.page === 0 ? (
                        <Heading
                        position={'relative'}
                        bottom='180px'>
                            You haven't liked any blogs yet
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
                    blog.page === blogPage ? null : blogPage === blog.page ? null : (
                        <Button
                        onClick={() => setBlogPage(blogPage + 1)}
                        _hover={{bgColor:'green.500', color:'white'}}
                        >
                            <Icon as={ArrowRightIcon} w='5' h='5' />
                        </Button>
                    )
                    
                }
            </HStack>

        </Stack>
    )
}