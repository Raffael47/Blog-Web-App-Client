import { Flex, FormLabel, Heading, Input, InputGroup, Select, Stack, Textarea, Button } from "@chakra-ui/react"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

export const CreateBlog = () => {

    const [category, setCategory] = useState([])

    const token = localStorage.getItem("token")

    const CreateSchema = Yup.object().shape({
        title: Yup.string()
        .required(),
        content: Yup.string()
        .required(),
        country: Yup.string()
        .required(),
        CategoryId: Yup.number()
        .required(),
        url: Yup.string(),
        keywords: Yup.string()
        .required(),
        file: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File too large",
            (value) => value === null || (value && value.size <= 10000000)
        )
        })

    const handleCreate = async(value) => {
        try {
            const {title, content, keywords, CategoryId, file, country, url} = value;
            const data = new FormData();
            data.append("data", JSON.stringify({title, content, keywords, CategoryId, country, url}))
            data.append("file", file)
            console.log(data)

            await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog/", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                "Content-type": "multipart/form-data"
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleCategory = async() => {
        try {
            const {data} = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
            setCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCategory()
    }, [])

    return (
        <Stack
        overflowX='hidden'
        >
            <Navbar/>
                <Heading
                alignSelf='center'
                marginBottom='3rem'
                size='2xl'
                >
                    Create Blog
                </Heading>

                <Formik
                initialValues={{title:"", content:"", country:"", CategoryId:"1", url:"", keywords:"", file:""}}
                validationSchema={CreateSchema}
                onSubmit={(value, action) => {
                    handleCreate(value)
                    action.resetForm()
                }}
                >
                    {({setFieldValue})=> {
                        return (
                            <Form>
                                <Flex
                                w='100%'
                                h='100%'
                                >
                                    <Flex
                                    w='30%'
                                    justifyContent='center'
                                    >
                                        <Stack
                                        w='80%'
                                        minH='40vh'
                                        gap='0'
                                        >
                                            
                                            {/* <InputGroup
                                            alignItems='center'
                                            > */}
                                            <FormLabel
                                            htmlFor="title"
                                            size='md'
                                            color='black'
                                            >
                                                Title
                                            </FormLabel>
                                            <Input
                                            as={Field}
                                            name="title"
                                            type='text'
                                            border='1px solid black'
                                            _hover={{border:'1px solid orange'}}
                                            />
                                            {/* </InputGroup> */}
                                            <ErrorMessage
                                            component='div'
                                            name='title'
                                            style={{color: 'red'}}
                                            />

                                            {/* <InputGroup
                                            alignItems='center'
                                            > */}
                                            <FormLabel
                                            htmlFor="country"
                                            size='md'
                                            color='black'
                                            >
                                                Country
                                            </FormLabel>
                                            <Input
                                            as={Field}
                                            name="country"
                                            type='text'
                                            border='1px solid black'
                                            _hover={{border:'1px solid orange'}}
                                            />
                                            {/* </InputGroup> */}
                                            <ErrorMessage
                                            component='div'
                                            name='country'
                                            style={{color: 'red'}}
                                            />

                                            {/* <InputGroup
                                            alignItems='center'
                                            > */}
                                            <FormLabel
                                            htmlFor="CategoryId"
                                            size='md'
                                            color='black'
                                            >
                                                Category
                                            </FormLabel>
                                            <Field
                                            as={Select}
                                            w='100%'
                                            name="CategoryId"
                                            border='1px solid black'
                                            borderRadius='10px'
                                            _hover={{border:'1px solid orange'}}
                                            >
                                                {category.map(item => {
                                                    
                                                    return (
                                                        <option value={item.id} > {item.name} </option>
                                                    )
                                                })}
                                            </Field>
                                            {/* </InputGroup> */}
                                            <ErrorMessage
                                            component='div'
                                            name='CategoryId'
                                            style={{color: 'red'}}
                                            />

                                            <FormLabel
                                            htmlFor='file'
                                            size='md'
                                            color='black'
                                            >
                                                Image
                                            </FormLabel>
                                            <Input
                                            as={Input}
                                            type='file'
                                            name='file'
                                            accept="image/*"
                                            onChange={(e) => {
                                                setFieldValue("file", e.target.files[0])
                                            }}
                                            />
                                            <ErrorMessage
                                            component='div'
                                            name='file'
                                            style={{color: 'red'}}
                                            />

                                            {/* <InputGroup
                                            alignItems='center'
                                            > */}
                                            <FormLabel
                                            htmlFor="url"
                                            size='md'
                                            color='black'
                                            >
                                                Video URL
                                            </FormLabel>
                                            <Input
                                            as={Field}
                                            name="url"
                                            type='url'
                                            border='1px solid black'
                                            _hover={{border:'1px solid orange'}}
                                            />
                                            {/* </InputGroup> */}
                                            <ErrorMessage
                                            component='div'
                                            name='url'
                                            style={{color: 'red'}}
                                            />

                                            {/* <InputGroup
                                            alignItems='center'
                                            > */}
                                            <FormLabel
                                            htmlFor="keywords"
                                            size='md'
                                            color='black'
                                            >
                                                Keywords
                                            </FormLabel>
                                            <Input
                                            as={Field}
                                            name="keywords"
                                            type='text'
                                            border='1px solid black'
                                            _hover={{border:'1px solid orange'}}
                                            />
                                            {/* // </InputGroup> */}
                                            <ErrorMessage
                                            component='div'
                                            name='keywords'
                                            style={{color: 'red'}}
                                            />

                                            <Button
                                            type='submit'
                                            marginTop='1rem'
                                            _hover={{bgColor: "orange"}}
                                            >
                                                Publish
                                            </Button>

                                        </Stack>
                                    </Flex>
                
                                    <Flex
                                    w='70%'
                                    justifyContent='center'
                                    >
                                        <Stack                                    
                                        w='70%'
                                        minH='40vh'
                                        >
                                            <Field
                                            as={Textarea}
                                            type="text"
                                            name="content"
                                            placeholder="Write your article here"
                                            minH='300px'
                                            paddingTop='1rem'
                                            border='1px solid black'
                                            _hover={{border:'1px solid orange'}}
                                            />
                                        </Stack>
                                    </Flex>
                                </Flex>
                            </Form>
                        )
                    }}

                </Formik>

        </Stack>
    )
}