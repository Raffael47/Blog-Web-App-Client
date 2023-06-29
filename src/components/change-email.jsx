import { Button, Flex, FormLabel, Input, useToast, } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ChangeEmail = () => {
    
    const token = localStorage.getItem("token")

    const { email } = useSelector(state => state.user.authValue)

    const emailSchema = Yup.object().shape({
        newEmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
    })

    const toast = useToast()

    const handleEmail = async(value) => {
        try {
            value.currentEmail = email
            value.FE_URL = "https://main--papaya-cajeta-e43767.netlify.app"
            await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail", value, {
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            })
            toast({
                title:'Check your email to update your profile',
                status: 'info',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
            toast({
                title: `Email has already been used`,
                status: 'error',
                isClosable: true
            })
        }
    }

    return (
        <Formik
        initialValues={{currentEmail: "", newEmail:""}}
        validationSchema={emailSchema}
        onSubmit= {(value, action) => {
            handleEmail(value)
            action.resetForm()
            localStorage.removeItem("token")
        }}
        >
            {({dirty}) => {
                return (
                    <Form>
                        <Flex
                        w='100%'
                        gap='5px'
                        alignItems='center'
                        >
                            <FormLabel
                            minW='20%'
                            fontSize='md'
                            htmlFor="newEmail"
                            alignItems='center'
                            justifySelf='center'
                            >
                                Email
                            </FormLabel>
                                <Input
                                as={Field}
                                name="newEmail"
                                type= "email"
                                w='100%'
                                variant='flushed'
                                placeholder={email}
                                />
                            <ErrorMessage
                            component='div'
                            name="newEmail"
                            style={{color: 'red'}}
                            />

                            <Button
                            type='submit'
                            w='30%'
                            _hover={{bgColor:'green.500', color:'white'}}
                            disabled={!dirty}
                            >
                                Update
                            </Button>
                        </Flex>
                    </Form>
                )
            }}
        </Formik>
    )
}