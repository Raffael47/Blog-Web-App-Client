import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image,
  Avatar,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const [newBlog, setNewBlog] = useState([])

  const getNewBlog = async() => {
      try {
          const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC`)
          setNewBlog(data.result)
          console.log(data.result)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getNewBlog()
  }, [])

  return (
    <Stack
      position={'relative'}
      height={'440px'}
      width={'700px'}
      bgColor='orange'
      border='2px solid black'
      borderRadius='10px'
      alignSelf='center'
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" style={{color:'orange'}} />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" style={{color:'orange'}} />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {newBlog.map(({ id, title, imageURL, User, Category, createdAt }, index) => (
            <Box
                key={index}
                height={'6xl'}
                position="relative"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize='cover'
                boxSize='400px'
                backgroundImage={`url(${`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`})`}>
                {/* This is the block you need to change, to customize the caption */}
                <Link to={`/blog-detail/${id}`}>
                <Container 
                size="container.lg" 
                h='600px'
                position="relative">
                <Stack
                    spacing={6}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                    backdropFilter='auto'
                    backdropContrast='20%'
                    padding='1rem'
                    borderRadius='5px'
                    color='white'>
                    <Heading fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}>
                        {console.log(title)}
                    {title}
                    </Heading>
                    <Text textShadow='0 0 20px black' fontSize={{ base: 'md', lg: 'lg' }} color="white">
                    <Avatar src={`https://minpro-blog.purwadhikabootcamp.com/${User.imgProfile}`} /> 
                    {User.username}
                    {Category.name}
                    {createdAt}
                    </Text>
                </Stack>
                </Container>
                </Link>
            </Box>
        ))}
      </Slider>
    </Stack>
  );
}