import { Stack } from "@chakra-ui/react"
import { Login } from "../components/log-in"

export const LoginPage = () => {
    return (
    <Stack
        w='100vw'
        h='100vh'
        bgColor='grey.900'
        justifyContent='center'
        alignItems='center'
    >
        <Login/>
    </Stack>
    )
}