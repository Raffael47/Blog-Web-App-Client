import Navbar from "../components/navbar"
import { Carousel } from "../components/carousel"
import { Blogs } from "../components/blogs"
import { Stack } from "@chakra-ui/react"
import { Footer } from "../components/footer"
import { FavBlog } from "../components/favBlog"
import CaptionCarousel from "../components/carousel2"
import { CarouselTest } from "../components/carousel3"

export const Home = () => {
    return (
        <Stack
        // overflowX='hidden'
        >
            <Navbar/>
            <CarouselTest/>
            {/* <Carousel/> */}
            {/* <CaptionCarousel/> */}
            <FavBlog/>
            <Blogs/>
            <Footer/>
        </Stack>
    )
}