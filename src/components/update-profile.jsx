import { Heading, Stack } from "@chakra-ui/react"
import { ChangeUsername } from "./change-username";
import { ChangeEmail } from "./change-email";
import { ChangePhone } from "./change-phone";
import { ChangeAvatar } from "./change-avatar";

export const ChangeProfile = () => {

    return (
        <Stack
        overflowX='hidden'
        w='100%'
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