import { Flex, Input, Select, Stack, Button, Heading, HStack, Image, Icon, Center, Box, Text, Avatar, InputGroup, InputLeftElement, FormLabel } from "@chakra-ui/react"
import Navbar from "../components/navbar"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { FaSearch } from "react-icons/fa"

export const SearchPage = () => {

    const [ascending, setAscending] = useState(false)
    const [category, setCategory] = useState([])
    const [blog, setBlog] = useState({})
    const [blogList, setBlogList] = useState([])
    const [blogPage, setBlogPage] = useState(1)

    const searchRef = useRef()
    const categoryRef = useRef()
    const ascendRef = useRef()
    const pageRef = useRef()

    const handleAscend = () => {
        setAscending(!ascending)
    }

    const handleCategory = async() => {
        try {
            const {data} = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
            setCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async() => {
        try {
            const categories = categoryRef.current.value
            const search = searchRef.current.value
            const ascend = ascendRef.current.value
            const page = blogPage

            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${categories}&sort=${ascend}&page=${page}&search=${search}`)
            setBlog(data)
            setBlogList(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setBlogPage(1)
    }, [searchRef.current])

    useEffect(() => {
        handleCategory()
        handleSearch()
    }, [blogPage])

    const {sortDate} = require("../functions/date")
    const navigate = useNavigate()

    return (
        <Stack
        overflow='hidden'>
            <Navbar/>

            <Heading
            size='2xl'
            alignSelf='center'
            marginBottom='3rem'>
                Search
            </Heading>

            <Stack>
                <Stack
                gap='1rem'
                alignSelf='center'
                w='40%'
                marginBottom='3rem'>
                    <InputGroup>

                        <InputLeftElement>
                            <Icon as={FaSearch}  />
                        </InputLeftElement>

                        <Input
                        type='search'
                        name='search'
                        ref={searchRef}
                        border='1px solid black'
                        placeholder="Keywords or title"
                        borderRadius='10px'
                        _hover={{borderColor:'green.500'}}
                        />
                    </InputGroup>

                    <Select
                    ref={ascendRef}
                    border='1px solid black'
                    borderRadius='10px'
                    _hover={{borderColor:'green.500'}}
                    >
                        <option value='DESC'>Latest</option>
                        <option value='ASC'>Oldest</option>
                    </Select>

                    <FormLabel
                    className="categories"
                    mt='1rem'
                    mb='0'
                    fontSize='xl'
                    >
                        CATEGORY
                    </FormLabel>
                    <Select
                    name='categories'
                    placeholder="All"
                    defaultValue=''
                    ref={categoryRef}
                    borderRadius='10px'
                    _hover={{borderColor:'green.500'}}
                    border='1px solid black'>
                        {category.map(({id, name}) => {
                            return (
                                <option value={id} >
                                    {name}
                                </option>
                            )
                        })}
                    </Select>
                    <Button
                    onClick={handleSearch}
                    _hover={{bgColor:"green.500", color:'white'}}
                    w='100%'
                    >
                        SEARCH
                    </Button>
                </Stack>

                <Stack>
                    {
                        blogList.length === 0 ? (
                            <Stack
                            w='100%'
                            align={'center'}>
                                <Heading
                                alignSelf='center'
                                >
                                    No result found
                                </Heading>
                                <Text
                                fontSize='md'
                                >
                                    Sorry, but nothing matched your criteria.
                                </Text>
                            </Stack>
                        ) : (
                            <>
            <Flex
            flexWrap='wrap'
            w='100%'
            h='100%'
            padding='3rem'
            gap='2rem'
            justifyContent='center'
            >
                {blogList.map(({id, title, imageURL, User, Category, createdAt, country }) => {
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
                                        {country}~{sortDate(createdAt)}
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
                                        _hover={{bgColor:"green.500"}}
                                        >
                                            <Icon as={ArrowLeftIcon} w='5' h='5' color={'black'} _hover={{bgColor:'green.500'}} />
                                        </Button>
                                    )
                                }
                                
                                <Heading
                                size='sm'
                                ref={pageRef}
                                >
                                    {blogPage}
                                </Heading>

                                {
                                    blogPage === blog.page ? null : (
                                        <Button
                                        onClick={() => setBlogPage(blogPage + 1)}
                                        _hover={{bgColor:"green.500"}}
                                        >
                                            <Icon as={ArrowRightIcon} w='5' h='5' color={'black'} _hover={{bgColor:'green.500'}} />
                                        </Button>
                                    )
                                }
                            </HStack>
                            </>
                        )
                    }
                </Stack>

            </Stack>

            <Footer/>
        </Stack>
    )
}
