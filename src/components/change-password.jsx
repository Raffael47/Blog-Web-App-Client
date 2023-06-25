import { Button, ButtonGroup, Flex, FormLabel, Heading, Icon, Input, InputGroup, Stack, useToast } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

export const ChangePassword = () => {

    const token = localStorage.getItem("token")

    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)

    const handleShowCurrentPassword = () => setShowOld(!showOld)
    const handleShowNewPassword = () => setShowNew(!showNew)
    const handleConfirmShowPassword = () => setConfirmShow(!confirmShow)

    const passwordSchema = Yup.object().shape({
        currentPassword: Yup.string()
        .min(6, "Your password needs to have at least 6 characters")
        .matches(/[a-z]+/, "Password no lowercase")
        .matches(/[A-Z]+/, "Password no uppercase")
        .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
        .required("Password is required"),
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
            value.FE_URL = "https://papaya-cajeta-e43767.netlify.app"
            await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass", value , {
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            })
            toast({
                title:'Password is updated',
                status: 'success',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <Stack
            w='100%'
            alignItems='center'
            justifyContent='center'
            gap='2rem'
            >
                <Heading>
                    Change Password
                </Heading>

                <Formik
                initialValues={{currentPassword:"", password: "", confirmPassword:""}}
                validationSchema={passwordSchema}
                onSubmit= {(value, action) => {
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
                                    <FormLabel
                                    fontSize='md'
                                    htmlFor="currentPassword"
                                    >
                                        Current Password
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                        as={Field}
                                        name="currentPassword"
                                        type= {showOld ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleShowCurrentPassword}
                                        >
                                            {showOld ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
                                        </Button>
                                    </InputGroup>
                                    <ErrorMessage
                                    component='div'
                                    name="currentPassword"
                                    style={{color: 'red'}}
                                    />

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
                                        type= {showNew ? "text" : "password"}
                                        w='100%'
                                        />
                                        <Button
                                        onClick={handleShowNewPassword}
                                        >
                                            {showNew ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />}
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
                                        Change Password
                                    </Button>
                                </Stack>
                            </Form>
                        )
                    }}
                </Formik>
            </Stack>
    )
}