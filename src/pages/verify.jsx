import { Button, Stack, Box, Heading } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const Verify = () => {

    const {token} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async() => {
        try {
            await Axios.patch(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify/", {},
                {
                    headers :{
                    "Authorization":`Bearer ${token}`
                    }
                }
            )
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [])

    const toHome = (to) => {
        navigate(to)
    }

    return (
        <Stack
        w='100vw'
        h='100vh'
        justifyContent='center'
        alignItems={'center'}
        bgColor='gray.900'
        >
            <Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                        You are verified
                    </Heading>
    
            <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            onClick={() => toHome("/")}
            variant="solid">
            Go to Home
            </Button>
            </Box>
        </Stack>
    )
}