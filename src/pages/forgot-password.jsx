import { Heading, Flex, Stack, Text, Icon, Input, Button } from "@chakra-ui/react"
import { GoMail } from "react-icons/go";
import axios from "axios"
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"

export const ForgotPassword = ()  => {

    const handleSubmit = async(value) => {
        try {
            value.FE_URL = "http:/localhost:3000"
            await axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", value)
        } catch (error) {
            console.log(error)
        }
    }

    const emailSchema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
    })

    return (
        <Flex
        w='100vw'
        h='100vh'
        bgColor='orange.500'
        justifyContent='center'
        alignItems='center'
        >
            <Stack
            bgColor='blackAlpha.600'
            minW='30vw'
            minH='60vh'
            borderRadius='10px'
            color='white'
            padding='1rem'
            alignItems='center'
            justifyContent='center'
            >
                <Heading
                >
                    Reset Password
                </Heading>
                <Text
                fontSize='small'

                >
                    Don't have an account? <Link to={"/sign-up"} >Sign up!</Link>
                </Text>

                <Icon
                as={GoMail}
                w='5rem'
                h='5rem'
                />

                <Formik
                initialValues={{email: ""}}
                validationSchema={emailSchema}
                onSubmit={(value) => {
                    handleSubmit(value)
                }}
                >
                    {() => {
                        return (
                            <Form>
                                <Stack
                                w='100%'
                                >
                                    <Input
                                    name="email"
                                    type="email"
                                    as={Field}
                                    w='100%'
                                    placeholder="Enter your email"
                                    bgColor='black'
                                    />
                                    <ErrorMessage
                                    component='div'
                                    name='email'
                                    style={{color: 'red'}}
                                    />

                                    <Button
                                    type="submit"
                                    w='100%'
                                    bgColor='black'
                                    color='white'
                                    _hover={{bgColor: "orange"}}
                                    >
                                        Send Link
                                    </Button>
                                </Stack>
                            </Form>
                        )
                    }}
                </Formik>

            </Stack>
        </Flex>
    )
}