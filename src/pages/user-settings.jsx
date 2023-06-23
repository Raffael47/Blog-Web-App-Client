import { ChangePassword } from "../components/change-password"
import { ChangeProfile } from "../components/update-profile"
import { Stack } from "@chakra-ui/react";
import Navbar from "../components/navbar"

export const UserSettings = () => {
    return (
        <Stack
        overflowX='hidden'
        >
        <Navbar/>
        <ChangeProfile/>
        <ChangePassword/>
        </Stack>
    )
}