import { HStack, Heading } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <HStack
        marginTop='3rem'
        padding='2rem'
        w='100vw'
        h='35vh'
        bgColor='black'
        color='white'
        overflowX='hidden'
        >
            <Heading>
                ABOUT
            </Heading>
        </HStack>
    )
}