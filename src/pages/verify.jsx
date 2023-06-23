import { Button } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Verify = () => {

    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = async() => {
        try {
            const response = await Axios.patch(
                "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify/", {},
                {
                    headers :{
                    "Authorization":`Bearer ${params.token}`
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
        <Button
        type='submit'
        onClick={() => toHome("/")}
        >
            Back to home page
        </Button>
    )
}