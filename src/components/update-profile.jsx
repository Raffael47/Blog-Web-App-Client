import { Heading, Stack } from "@chakra-ui/react"
import { ChangeUsername } from "./change-username";
import { ChangeEmail } from "./change-email";
import { ChangePhone } from "./change-phone";
import { ChangeAvatar } from "./change-avatar";

export const ChangeProfile = () => {

    return (
        <Stack
        bgColor='gray.150'
        border='1px solid black'
        padding='1rem'
        overflowX='hidden'
        >
            <Heading
            marginBottom='3rem'
            alignSelf='center'
            >
                Update Profile
            </Heading>
            
            <Stack
            alignSelf='center'
            w='60%'
            gap='1rem'
            >
                <ChangeAvatar/>
                <ChangeUsername/>
                <ChangeEmail/>
                <ChangePhone/>

            </Stack>
        </Stack>
    )
}