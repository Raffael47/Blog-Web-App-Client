import { Button, Flex, FormLabel, Input, } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ChangeUsername = () => {

    const token = localStorage.getItem("token")

    const { username } = useSelector(state => state.user.authValue)

    const usernameSchema = Yup.object().shape({
        newUsername: Yup.string()
        .required("Username is required")
    })

    const handleUsername = async(value) => {
        try {
            value.currentUsername = username
            await axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername", value, {
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik
        initialValues={{currentUsername: "", newUsername:""}}
        validationSchema={usernameSchema}
        onSubmit= {(value, action) => {
            handleUsername(value)
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
                            htmlFor="newUsername"
                            border='1px solid black'
                            justifyContent='center'
                            >
                                Username
                            </FormLabel>
                                <Input
                                as={Field}
                                name="newUsername"
                                type= "text"
                                w='100%'
                                placeholder={username}
                                />
                            <ErrorMessage
                            component='div'
                            name="newUsername"
                            style={{color: 'red'}}
                            />

                            <Button
                            type='submit'
                            w='30%'
                            _hover={{bgColor:'orange'}}
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