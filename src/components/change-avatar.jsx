import { Avatar, Button, Flex, FormLabel, Input, Stack, InputGroup, useToast } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setAuth } from "../redux/userSlice";

export const ChangeAvatar = () => {

    const token = localStorage.getItem("token")

    const { imgProfile } = useSelector(state => state.user.authValue)

    const avatarSchema = Yup.object().shape({
        file: Yup.mixed()
        .required("Image is required")
        .test(
            "fileSize",
            "File too large",
            (value) => value === null || (value && value.size <= 10000000)
        )
    })

    const toast = useToast()

    const handleAvatar = async(value) => {
        try {
            const { file } = value;
            const data = new FormData();
            data.append("file", file)

            const response = await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded", data, {
                headers: {
                    "Authorization":`Bearer ${token}`
                },
                "Content-type": "multipart/form-data"
            })
            toast({
                title: `Avatar updated`,
                status: 'error',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Stack
        alignItems='center'
        marginBottom='2rem'
        gap='1rem'
        >
            <Avatar 
            size='2xl'
            src={`https://minpro-blog.purwadhikabootcamp.com/${imgProfile}`} 
            />
            <Formik
            initialValues={{file: ""}}
            validationScheme={avatarSchema}
            onSubmit={(value) => {
                handleAvatar(value)
            }}
            >
                {({setFieldValue}) => {
                    return (
                        <Form>
                            <InputGroup
                            >
                                <Input
                                as={Input}
                                type='file'
                                name='file'
                                accept="image/*"
                                onChange={(e) => {
                                    setFieldValue("file", e.target.files[0])
                                    console.log(e.target.files[0])
                                }}
                                />
                                <Button
                                type='submit'
                                _hover={{bgColor: "green.500"}}
                                >
                                    Save
                                </Button>
                            </InputGroup>
                        </Form>
                    )
                }}
            </Formik>
        </Stack>
    )
}
{/* <Avatar 
            size='2xl'
            src={imgProfile} 
            /> */}