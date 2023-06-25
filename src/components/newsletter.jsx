import { useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";

export const Newsletter = () => {

    const emailSchema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid")
        .required()
    })

  return (
    // <Flex
    //   align={'center'}
    //   justify={'center'}
    //   bg={('gray.50', 'gray.800')}>
      <Container
        maxW={'lg'}
        bg={('white', 'whiteAlpha.200')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
        direction={'column'}>
        <Heading
          as={'h2'}
          fontSize={'xl'}
          textAlign={'center'}
          mb={5}>
          Subscribe to our Newsletter
        </Heading>

        <Formik
        initialValues={{email:""}}
        validationSchema={emailSchema}
        onSubmit={(value, action) => {
            action.resetForm()
        }}
        >
            {() => {
                return (
                    <Form>

                        <Stack
                        direction={{ base: 'column', md: 'row' }}
                        spacing={'12px'}
                        >

                        <FormControl>
                            <Input
                            as={Field}
                            borderWidth={1}
                            color={'white'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={('gray.300', 'gray.700')}
                            name='email'
                            type={'email'}
                            required
                            placeholder={'Your Email'}
                            aria-label={'Your Email'}
                            />
                            <ErrorMessage
                            component={'div'}
                            name='email'
                            style={{color: 'red'}}
                            />
                        </FormControl>

                        <FormControl w={{ base: '100%', md: '40%' }}>
                            <Button
                            w="100%"
                            type='submit'
                            _hover={{bgColor:'green.500', color: 'white'}}
                            >
                                SEND
                            </Button>
                        </FormControl>

                        </Stack>
                    </Form>
                )
            }}
        </Formik>
      </Container>
    // </Flex>
  );
}