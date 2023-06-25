import Navbar from "../components/navbar"
import { Stack } from "@chakra-ui/react"
import { CarouselTest } from "../components/carousel3"
import Footer from "../components/footer"
import { FavBlogs } from "../components/favBlog"

export const Home = () => {
    return (
        <Stack
        overflowX='hidden'
        >
            <Navbar/>
            <CarouselTest/>
            <FavBlogs/>
            <Footer/>
        </Stack>
    )
}