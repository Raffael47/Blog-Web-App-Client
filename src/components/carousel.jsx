// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { Flex, Heading, Image, Slide, Stack, Text } from "@chakra-ui/react";
// import { Link } from 'react-router-dom';

// import 'swiper/swiper-bundle.css';

// export const Carousel = () => {

//     const [newBlog, setNewBlog] = useState([])

//     const getNewBlog = async() => {
//         try {
//             const {data} = await axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=DESC`)
//             setNewBlog(data.result)
//             console.log(newBlog)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getNewBlog()
//     }, [])

//     return (
//         <Swiper
//         width='100vw'
//         height="600px"
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={50}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         // scrollbar={{ draggable: true }}
//         onSwiper={(swiper) => console.log(swiper)}
//         onSlideChange={() => console.log('slide change')}
//         >
//             {newBlog.map(({id, title, imageURL }) => {
//                 return (
//                     // <Link to={`/blog-detail/${id}`}>
//                         <SwiperSlide
//                         >
//                             {/* <Image
//                             src={`https://minpro-blog.purwadhikabootcamp.com/${imageURL}`}
//                             alignSelf='center'
//                             w='500px'
//                             h='400px'
//                             /> */}
//                             <Text
//                             >
//                                 {title}
//                             </Text>
//                         </SwiperSlide>
//                     // </Link>
//                 )
//             })}
//         </Swiper>
//     )
// }