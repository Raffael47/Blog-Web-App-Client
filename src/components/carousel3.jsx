
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carousel.css"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { Flex, Heading, Image, Slide, Stack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

import 'swiper/swiper-bundle.css';

export const CarouselTest = () => {

    const [newBlog, setNewBlog] = useState([])

    const getNewBlog = async() => {
        try {
            const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC`)
            setNewBlog(data.result)
            console.log(newBlog)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewBlog()
    }, [])

    return (
        <>
            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            >
            {newBlog.map(({id, title, imageURL }) => {
                return (
                    <SwiperSlide>
                        <Link to={`/blog-detail/${id}`}>
                            <Image
                            src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`}
                            alignSelf='center'
                            boxSize='450px'
                            />
                            <Text
                            >
                                {title}
                            </Text>
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
        </>
    )
}