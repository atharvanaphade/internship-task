import React from 'react'
import { Button, Center, Heading, Input, InputGroup, Select, Stack } from '@chakra-ui/react';

const Home = () => {
    const [article, setArticle] = React.useState("");
    const [language, setLanguage] = React.useState('');

    const onSubmit = (e) => {
        console.log(article + language);
    }

    return (
        <>
            <Center bg='transparent' h='80vh'>
                <Stack spacing={4} w='50%'>
                    <Heading align='center' fontSize={['lg', 'lg', '3xl']}>
                        Translate a Wikipedia Article from English to any Indian Language
                    </Heading>
                    <InputGroup />
                    <Input type='text' onChange={(e) => {setArticle(e.target.value)}} placeholder="Wikipedia Article" />
                    <Select onChange={(e) => {setLanguage(e.target.value)}} placeholder='Language to translate to'>
                        <option value='hi'>Hindi</option>
                        <option value='bn'>Bengali</option>
                        <option value='pa'>Punjabi</option>
                        <option value='te'>Telugu</option>
                        <option value='ta'>Tamil</option>
                    </Select>
                    <Button onClick={onSubmit} colorScheme='orange'>Translate</Button>
                </Stack>
            </Center>
        </>
    );
}

export default Home;