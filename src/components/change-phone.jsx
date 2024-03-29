import { Button, Flex, FormLabel, Input, useToast, } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ChangePhone = () => {

    const token = localStorage.getItem("token")

    const { phone } = useSelector(state => state.user.authValue)

    const phoneSchema = Yup.object().shape({
        newPhone: Yup.string()
        .required("Phone number is required")
    })

    const toast = useToast()

    const handlePhone = async(value) => {
        try {
            value.currentPhone = phone
            value.FE_URL = "https://main--papaya-cajeta-e43767.netlify.app"
            await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone", value, {
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
                title: error.response.config.data,
                status: 'error',
                isClosable: true
            })
        }
    }

    return (
        <Formik
        initialValues={{currentPhone: "", newPhone:""}}
        validationSchema={phoneSchema}
        onSubmit= {(value, action) => {
            handlePhone(value)
            action.resetForm()
            localStorage.removeItem("token")
        }}
        >
            {() => {
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
                            htmlFor="newPhone"
                            alignSelf='center'
                            >
                                Phone Number
                            </FormLabel>
                                <Input
                                as={Field}
                                name="newPhone"
                                type= "text"
                                w='100%'
                                variant='flushed'
                                placeholder={phone}
                                />
                            <ErrorMessage
                            component='div'
                            name="newPhone"
                            style={{color: 'red'}}
                            />

                            <Button
                            type='submit'
                            w='30%'
                            _hover={{bgColor:'green.500', color:'white'}}
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