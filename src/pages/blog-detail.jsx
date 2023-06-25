import { AspectRatio, Avatar, Button, Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react"
import Navbar from "../components/navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Footer from "../components/footer"

export const BlogDetail = () => {

    // function sortDate(date) {
    //     let sliced = date.slice(0, 10)
    //     return sliced.split("-").reverse().join("-")
    // }

    const [like, setLike] = useState(false)

    const token = localStorage.getItem("token")

    const postLike = async() => {
        try {
            await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog/like", {BlogId: params.id}, {
                headers: {
                    Authorization: `Bearer: ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

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

    const handleLike = () => {
        postLike()
        setLike(true)
    }

    
    const { Category, User, content, createdAt, imageURL, videoURL, title } = blogDetail
    // const {sortDate} = require("../functions/date")

    return (
        <Stack
        overflowX='hidden'
        >
            <Navbar/>

            <Stack
            alignSelf='center'
            alignItems='center'
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
                    {/* Publish date: {sortDate(createdAt)} */}
                </Text>
                <Text>
                    by   <Avatar size='sm' src={`https://minpro-blog.purwadhikabootcamp.com/${User?.imgProfile}`} />   {User?.username}
                </Text>
            </Stack>

            {
                token ? (
                    <Button
                    position='relative'
                    w='min'
                    bottom='50px'
                    size='lg'
                    left='800px'
                    onClick={handleLike}
                    >
                        {like ? <Icon as={FcLike} size='2xl' /> : <Icon as={FcLikePlaceholder} size='2xl' /> }
                    </Button>
            ) : null
            }

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
                    maxW='500px'
                    maxH='450px'
                    // boxSize='450px'
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
                fontSize='2xl'
                >
                    {content}
                </Text>
            </Stack>

            <Footer/>

        </Stack>
    )
}