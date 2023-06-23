import { Stack, Image, Heading, HStack, Button, Flex, Icon } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai";

export const MyArticle = () => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [blogPage, setBlogPage] = useState(1)
    const [blog, setBlog] = useState({})

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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData(blogPage)
    }, [blogPage])

    return (
        <Stack
        overflow='hidden'>
            <Flex
            flexWrap='wrap'
            w='100%'
            h='100%'
            padding='3rem'
            gap='2rem'
            justifyContent='center'
            >
                {data.map(({id, title, imageURL }) => {
                    return (
                        <Stack
                        key={id}
                        border='1px solid black'
                        borderRadius='10px'
                        w='250px'
                        minH='250px'
                        padding='1rem auto'
                        alignItems='center'
                        >
                            <Link to={`/blog-detail/${id}`}>
                                <Image 
                                src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`} 
                                boxSize='200px'
                                borderRadius='10px'
                                />
                                <Heading
                                size='sm'
                                alignSelf='flex-start'
                                >
                                    {title}
                                </Heading>
                                </Link>

                                <Button
                                onClick={() => deletePost(id)}
                                _hover={{bgColor:'red'}}
                                w='20px'
                                h='40px'
                                >
                                    <Icon _hover={{color: 'white'}} as={AiFillDelete} w='5' h ='5' />
                                </Button>
                        </Stack>
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
                
                <Heading
                size='sm'
                >
                    {blogPage}
                </Heading>

                {
                    blogPage === blog.page ? null : (
                        <Button
                        onClick={() => setBlogPage(blogPage + 1)}
                        >
                            Next
                        </Button>
                    )
                }
            </HStack>
        </Stack>
    )
}