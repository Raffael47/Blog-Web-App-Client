import { Button, ButtonGroup, Flex, FormLabel, Heading, Icon, Input, InputGroup, Stack, useToast } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)

    const handleShowPassword = () => setShow(!show)
    const handleConfirmShowPassword = () => setConfirmShow(!confirmShow)

    const passwordSchema = Yup.object().shape({
        password: Yup.string()
        .min(6, "Your password needs to have at least 6 characters")
        .matches(/[a-z]+/, "Password no lowercase")
        .matches(/[A-Z]+/, "Password no uppercase")
        .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
        .required("Password is required"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required()
    })

    const toast = useToast()

    const handleSubmit = async(value) => {
        try {
            await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass", value, 
            {
                headers: {
                    "Authorization":`Bearer ${params.token}`
                }
            })
            toast({
                title:'Password reset success',
                status:'success',
                isClosable: true
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex
        w='100vw'
        h='100vh'
        bgColor='white'
        color='black'
        alignItems='center'
        justifyContent='center'
        >
            <Stack
            minW='30vw'
            minH='60vh'
            bgColor='gray.150'
            border='1px solid black'
            borderRadius='10px'
            padding='1rem'
            alignItems='center'
            justifyContent='center'
            >
                <Heading>
                    Reset Password
                </Heading>

                <Formik
                initialValues={{password: "", confirmPassword:""}}
                validationSchema={passwordSchema}
                onSubmit= {(value, action) => {
                    handleSubmit(value)
                    action.resetForm()
                    navigate('/')
                }}
                >
                    {() => {
                        return (
                            <Form>
                                <Stack
                                w='100%'
                                >
                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="password"
                                    >
                                        New Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="password"
                                        type= {show ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleShowPassword}
                                        >
                                            {show ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="password"
                                    style={{color: 'red'}}
                                    />

                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="confirmPassword"
                                        type= {confirmShow ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleConfirmShowPassword}
                                        >
                                            {confirmShow ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="confirmPassword"
                                    style={{color: 'red'}}
                                    />

                                    <Button
                                    type='submit'
                                    w='100%'
                                    _hover={{bgColor:'green.500', color:'white'}}
                                    >
                                        Reset Password
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