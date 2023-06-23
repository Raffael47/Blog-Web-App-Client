import { Button, ButtonGroup, Flex, FormLabel, Heading, Icon, Input, InputGroup, Stack, color } from "@chakra-ui/react"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

export const Signup = () => {
    const [show, setShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)

    const handlePassword = () => setShow(!show)
    const handleConfirmPassword = () => setConfirmShow(!confirmShow)

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        phone: Yup.string()
            .required("Phone number is required"),
        password: Yup.string()
            .min(6, "Your password needs to be at least 6 characters long")
            .matches()
            .required("Password is required"),
        confirmPassword: Yup.string()
            .required()
            .oneOf([Yup.ref("password"), null], "Password must match")
    })

    const handleSubmit = async(value) => {
        try {
            value.FE_URL = "http:/localhost:3000"
            await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/", value)
            console.log(value)
        } catch (err) {
            console.log(err)
        }
    }

    return (
    <Stack
        w='100vw'
        h='100vh'
        bgColor='blackAlpha.700'
        padding='0 20rem'
        gap='1.5rem'
        justifyContent='center'
        color='white'
    >
        <Heading fontSize='3xl' color='white' fontWeight='bold' >Sign Up</Heading>

        <Formik
        initialValues={{username:"", email:"", phone:"", password:"", confirmPassword:""}}
        validationSchema={registerSchema}
        onSubmit={(value, action) => {
            handleSubmit(value)
            action.resetForm()
        }}
        >

            {() => {
                return (
                    <Form>
                        <Stack>
                            <FormLabel
                            htmlFor="username"
                            size='md'
                            color='white'
                            >
                            Username
                            </FormLabel>
                            <Input
                            as={Field}
                            type="text"
                            name="username"
                            />
                            <ErrorMessage
                            component='div'
                            name="username"
                            style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                            />
                    
                            <FormLabel
                            htmlFor="email"
                            size='md'
                            color='white'
                            >
                            Email
                            </FormLabel>
                            <Input
                            as={Field}
                            type="email"
                            name="email"
                            />
                            <ErrorMessage
                            component='div'
                            name="email"
                            style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                            />
                    
                            <FormLabel
                            htmlFor="phone"
                            size='md'
                            color='white'
                            >
                            Phone Number
                            </FormLabel>
                            <Input
                            as={Field}
                            type="text"
                            name="phone"
                            />
                            <ErrorMessage
                            component='div'
                            name="phone"
                            style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                            />
                    

                        <Flex
                        gap='1rem'>

                            <Flex
                            flexDirection='column'
                            w='50%'
                            >
                            
                            <FormLabel
                            htmlFor="password"
                            size='md'
                            color='white'
                            >
                            Password
                            </FormLabel>
                            <ButtonGroup 
                            gap='0'
                            >
                            <Input
                            as={Field}
                            type={show ? 'text' : 'password'}
                            name="password"
                            />
                            <Button 
                            onClick={handlePassword} 
                            bgColor='blackAlpha.700'
                            color='white'
                            _hover={{bgColor:'blackAlpha.900'}}
                            > {show ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />} </Button>
                            </ButtonGroup>
                            <ErrorMessage
                            component='div'
                            name="password"
                            style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                            />
                            </Flex>
                    
                            <Flex
                            flexDirection='column'
                            w='50%'
                            >
                            <FormLabel
                            htmlFor="confirmPassword"
                            size='md'
                            color='white'
                            >
                            Confirm Password
                            </FormLabel>
                            <ButtonGroup gap='0'>
                            <Input
                            as={Field}
                            type={confirmShow ? 'text' : 'password'}
                            name="confirmPassword"
                            />
                            <Button 
                            onClick={handleConfirmPassword} 
                            bgColor='blackAlpha.700'
                            color='white'
                            _hover={{bgColor:'blackAlpha.900'}}
                            > {confirmShow ? <Icon as={AiFillEyeInvisible} w='5' h='5' /> : <Icon as={AiFillEye} w='5' h='5' />} </Button>
                            </ButtonGroup>
                            <ErrorMessage
                            component='div'
                            name="confirmPassword"
                            style={{ color: "red", fontSize: "15px", marginTop: 0 }}
                            />
                            </Flex>
                    
                    </Flex>

                            <Button
                            type="submit"
                            bgColor='blackAlpha.700'
                            color='white'
                            _hover={{bg:'orange'}}
                            >Sign up</Button>
                        
                        </Stack>
                    </Form>
                )
            }}

        </Formik>

    </Stack>
    )
}
