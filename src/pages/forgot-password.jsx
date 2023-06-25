import { Heading, Flex, Stack, Text, Icon, Input, Button, useToast } from "@chakra-ui/react"
import { GoMail } from "react-icons/go";
import axios from "axios"
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"

export const ForgotPassword = ()  => {

    const toast = useToast()

    const handleSubmit = async(value) => {
        try {
            value.FE_URL = "https://main--papaya-cajeta-e43767.netlify.app/"
            await axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", value)
            toast({
                title:'Check your email to verify',
                status: 'info',
                isClosable: true
            })
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
        bgColor='green.500.500'
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
                onSubmit={(value, action) => {
                    handleSubmit(value)
                    action.resetForm()
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
                                    _hover={{bgColor: "green.500"}}
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