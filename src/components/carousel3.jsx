
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../functions/carousel.css"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Flex, Heading, Image, Stack, Text, Box, Center, Icon, Avatar } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { BsFire } from "react-icons/bs";

export const CarouselTest = () => {

    const [newBlog, setNewBlog] = useState([])

    const navigate = useNavigate()

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

    const handleClick = (value) => {
        navigate(`/blog-detail/${value}`)
    }

    const {sortDate} = require('../functions/date')

    return (
        <Stack
        overflow='hidden'
        >

            <Center
            alignItems={'center'}
            >
                <Box
                w='90vw'
                borderBottom={'2px solid green'}
                justifyitems={'center'}
                paddingBottom='1rem'
                mb='2rem'
                >

                <Heading
                size='3xl'
                mt='2rem'
                color='green.500'
                >
                    HOT
                    <Icon as={BsFire} />
                </Heading>
                </Box>
            </Center>

            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
            >
            {newBlog.map(({id, title, imageURL, User, createdAt, country }, idx) => {
                return (
                    <SwiperSlide
                    key={idx}
                    >
                            <Image 
                            position="relative" 
                            src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`} 
                            justifyContent="center" 
                            display="flex" 
                            />
                            <Flex 
                            onClick={() => handleClick(id)}
                            bgColor='rgba(0, 0, 0, .5)' 
                            w="100%" 
                            h="100%" 
                            position='absolute' 
                            borderRadius='10px' 
                            cursor="pointer"
                            >
                                <Box margin="auto" p="0px 50px" color="white">
                                <Heading color="white" fontSize={'6xl'} >{title}</Heading>

                                <Stack mt='1rem' direction={'row'} spacing={4} justify={'center'} >
                                <Avatar
                                    src={`https://minpro-blog.purwadhikabootcamp.com/${User.imgProfile}`}
                                    alt={'Author'}
                                />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text color={'white'} fontWeight={600}>{User.username}</Text>
                                    <Text color={'white'}>
                                        {country}~{sortDate(createdAt)}
                                    </Text>
                                </Stack>
                                </Stack>

                                </Box>
                            </Flex>
                    </SwiperSlide>
                )
            })}
        </Swiper>
        </Stack>
    )
}