import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Flex, HStack, Heading, Image, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const Blogs = () => {

    const [blog, setBlog] = useState({})
    const [blogList, setBlogList] = useState([])
    const [blogPage, setBlogPage] = useState(1)

    const getNewBlog = async(value) => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${value}`)
            console.log(data)
            setBlog(data)
            setBlogList(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewBlog(blogPage)
    }, [blogPage])

    console.log(blog.blogPage)
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
                {blogList.map(({id, title, imageURL }) => {
                    return (
                        <Stack
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