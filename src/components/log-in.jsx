import { Button, ButtonGroup, Flex, Icon, Heading, Input, InputGroup, Stack, FormLabel, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setAuth } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {

    const toast = useToast()

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const [inputType, setInputType] = useState("")
    
    const handlePassword = () => setShow(!show);
    
    const handleInputType = (value) => {
        setInputType(value)
    }

    const loginSchema = [
        (
            Yup.object().shape({
                    username: Yup.string()
                .required("Username is required"),
                password: Yup.string()
                    .min(6, "Your password needs to be at least 6 characters long")
                    .matches(/[a-z]+/, "Password no lowercase")
                    .matches(/[A-Z]+/, "Password no uppercase")
                    .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
                    .required("Password is required")
        })
        ),
        (
            Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Your password needs to be at least 6 characters long")
                    .matches(/[a-z]+/, "Password no lowercase")
                    .matches(/[A-Z]+/, "Password no uppercase")
                    .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
                    .required("Password is required")
        })
        ),
        (
            Yup.object().shape({
                phone: Yup.string()
                    .required("Phone number is required"),  
                password: Yup.string()
                    .min(6, "Your password needs to be at least 6 characters long")
                    .matches(/[a-z]+/, "Password no lowercase")
                    .matches(/[A-Z]+/, "Password no uppercase")
                    .matches(/[!@#$%^&*()-+]+/, "Password needs to have at least 1 special character")
                    .required("Password is required")
        })
        )
    ]

    const handleSubmit = async (value) => {
        try {
            const {data} = await axios.post(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
                value
            )
            dispatch(setAuth(data.isAccountExist))
            localStorage.setItem("token", data.token)
            navigate("/")
        } catch (err) {
            console.log(err)
            toast({
                title: `Sorry, your password is incorrent`,
                status: 'error',
                isClosable: true,
                description: 'Please double check your password'
            })
        }
    }
    
    return (
    <Stack
            w='50vw'
            minH='70vh'
            borderRadius='10px'
            bgColor='whiteAlpha.700'
            padding='0 2rem'
            gap='0.5rem'
            justifyContent='center'
            color='black'
        >
        <Heading fontSize='4xl' color='black' fontWeight='bold' >Log in</Heading>

        <ButtonGroup
        gap='1rem'
        alignSelf='center'
        >
            <Button onClick={() => handleInputType("username")}>
                Username
            </Button>
            <Button onClick={() => handleInputType("email")}>
                Email
            </Button>
            <Button onClick={() => handleInputType("phone")}>
                Phone number
            </Button>
        </ButtonGroup>

        <Formik
            initialValues={{username:"", email:"", phone:"", password:""}}
            validationSchema={inputType === "email"  ? loginSchema[1] : inputType === "phone" ? loginSchema[2] : loginSchema[0]}
            onSubmit={(value, action) => {
                handleSubmit(value)
                action.resetForm()
            }}
        >

            {() => {
                return (
                    <Form>
                            <FormLabel htmlFor="username">{inputType === "email"  ? "Email" : inputType === "phone" ? "Phone number" : "Username"}</FormLabel>
                            <Input
                                as={Field}
                                name={inputType === "email"  ? "email" : inputType === "phone" ? "phone" : "username"}
                                type= {inputType === "email" ? 'email' : 'text'}
                                placeholder={`Enter your ${inputType === "email" ? "email" : inputType === "phone" ? "phone number" : "username"}`}
                            />
                            <ErrorMessage
                                component='div'
                                name={inputType === "email"  ? "email" : inputType === "phone" ? "phone" : "username"}
                                style={{color: 'red'}}
                            />

                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Flex gap='1rem'>
                            <InputGroup>
                                <Input
                                    as={Field}
                                    type={show ? 'text' : 'password'}
                                    name="password"
                                    placeholder='Enter your password'
                                />
                                <Button type='button' onClick={handlePassword}> {show ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />} </Button>
                            </InputGroup>
                            <ErrorMessage
                                component='div'
                                name="password"
                                style={{color: 'red'}}
                            />

                            </Flex>

                            <Flex
                                color='purple'
                                justifyContent='end'
                                margin='1rem'
                            >
                                <Link to="/forgot-password">Forgot password?</Link>
                            </Flex>

                            <Flex
                                color='purple'
                                justifyContent='end'
                                margin='1rem'
                            >
                                <Link to="/">Continue as guest</Link>
                            </Flex>

                            <Button 
                            w='100%' 
                            type="submit"
                            _hover={{bgColor: 'green.500'}}
                            >
                                Log in
                            </Button>
                    </Form>
                )
            }}
        </Formik>
    </Stack>
    )
}