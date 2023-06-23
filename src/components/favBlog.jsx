import { Stack } from "@chakra-ui/react"
import axios from "axios"
import { useEffect } from "react"

export const FavBlog = () => {

    const getFavBlog = async() => {
        try {
            const {data} = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFavBlog()
    }, [])

    return (
        <Stack>

        </Stack>
    )
}