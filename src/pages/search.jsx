import { Flex, Input, Select, Stack, Button, Heading, HStack, Image } from "@chakra-ui/react"
import Navbar from "../components/navbar"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Form, Formik } from "formik"
import { Link } from "react-router-dom";
import { Footer } from "../components/footer"

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
                    <Input
                    type='search'
                    name='search'
                    ref={searchRef}
                    border='1px solid black'
                    placeholder="Keywords or title"
                    />

                    <Select
                    ref={ascendRef}
                    border='1px solid black'
                    >
                        <option value='DESC'>Descending</option>
                        <option value='ASC'>Ascending</option>
                    </Select>

                    <Select
                    name='categories'
                    placeholder="All"
                    defaultValue=''
                    ref={categoryRef}
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
                    _hover={{bgColor:"orange"}}
                    w='100%'
                    >
                        SEARCH
                    </Button>
                </Stack>

                <Stack>
                    {
                        blogList.length === 0 ? (
                            <Heading
                            alignSelf='center'
                            >
                                Blog not found
                            </Heading>
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
                                {blogList.map(({id, title, imageURL }) => {
                                    return (
                                        <Stack
                                        border='1px solid black'
                                        borderRadius='10px'
                                        w='250px'
                                        minH='250px'
                                        padding='0 1rem'
                                        alignItems='center'
                                        >
                                            <Link to={`/blog-detail/${id}`}>
                                                <Image 
                                                src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`} 
                                                boxSize='200px'
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
                                        _hover={{bgColor:"orange"}}
                                        >
                                            Prev
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
                                        _hover={{bgColor:"orange"}}
                                        >
                                            Next
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
