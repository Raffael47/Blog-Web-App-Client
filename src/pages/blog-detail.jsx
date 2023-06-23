import { AspectRatio, Avatar, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Navbar from "../components/navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Footer } from "../components/footer"

export const BlogDetail = () => {

    const params = useParams()

    const [blogDetail, setBlogDetail] = useState({})

    const getBlogDetail = async() => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`)
            console.log(data[0])
            setBlogDetail(data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlogDetail()
    }, [])

    const { Category, User, content, createdAt, imageURL, videoURL, title } = blogDetail

    return (
        <Stack
        overflowX='hidden'
        >
            <Navbar/>

            <Stack
            alignSelf='center'
            w='50vw'>
                <Heading
                size='3xl'
                alignSelf='center'
                marginBottom='1rem'
                >
                    {title}
                </Heading>
                <Text
                size='sm'
                >
                    {Category?.name}
                </Text>
                <Text
                size='sm'
                >
                    Publish date: {createdAt}
                </Text>
                <Text>
                    by   <Avatar size='sm' src={`https://minpro-blog.purwadhikabootcamp.com/${User?.imgProfile}`} />   {User?.username}
                </Text>
            </Stack>

            {videoURL === null ? (
                <Image
                alignSelf='center'
                boxSize='450px'
                marginBottom='2rem'
                src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`}/>
            ) : (
                <Flex
                justifyContent='center'
                gap='5rem'
                >
                    <Image
                    boxSize='450px'
                    borderRadius='10px'
                    marginBottom='2rem'
                    marginTop='2rem'
                    src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`}/>

                    <AspectRatio
                    ratio={1}
                    maxW='560px'
                    >
                        <iframe
                        src={videoURL}
                        />
                    </AspectRatio>
                </Flex>
            )}

            <Stack
            padding='0 5rem'>
                <Text
                size='xl'
                >
                    {content}
                </Text>
            </Stack>

            <Footer/>

        </Stack>
    )
}