import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Flex, HStack, Heading, Image, Stack, Center, Text, Avatar, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"

export const Blogs = () => {

    const {sortDate} = require("../functions/date")

    const navigate = useNavigate()

    const [blog, setBlog] = useState({})
    const [blogList, setBlogList] = useState([])
    const [blogPage, setBlogPage] = useState(1)

    const getNewBlog = async(value) => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${value}`)
            setBlog(data)
            setBlogList(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewBlog(blogPage)
    }, [blogPage])

    return (
        <Stack>
            <Flex
            flexWrap='wrap'
            w='100%'
            h='100%'
            padding='3rem'
            gap='2rem'
            justifyContent='center'
            >
                {blogList.map(({id, title, imageURL, User, Category, createdAt }) => {
                    return (
                        <Center py={6}>
                            <Box
                                key={id}
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
                                    <Text color={'gray.500'}>
                                        {sortDate(createdAt)}
                                    </Text>
                                </Stack>
                                </Stack>
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
                        _hover={{bgColor:'green.500'}}
                        >
                            <Icon as={ArrowLeftIcon} w='5' h='5' color={'black'} />
                        </Button>
                    )
                }
                
                <Heading
                size='sm'
                >
                    {blogPage}
                </Heading>

                {
                    blogPage === blog.page ? null : (
                        <Button
                        onClick={() => setBlogPage(blogPage + 1)}
                        _hover={{bgColor:'green.500'}}
                        >
                            <Icon as={ArrowRightIcon} w='5' h='5' color={'black'} />
                        </Button>
                    )
                }
            </HStack>

        </Stack>
    )
}