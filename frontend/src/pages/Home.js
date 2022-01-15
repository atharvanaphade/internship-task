import React from 'react'
import { Box, Button, Center, Divider, Heading, HStack, Input, InputGroup, Select, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

import data from '../lib/variables';

const Home = () => {
    const [article, setArticle] = React.useState('');
    const [language, setLanguage] = React.useState('');
    const [projects, setProjects] = React.useState([]);
    const [loading, setloading] = React.useState(true);

    const onSubmit = (e) => {
        const project = {
            wiki_title: article,
            target_lang: language,
        }
        axios.post(data.api + 'create_project/', project)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        window.location.reload();
    };

    React.useEffect(() => {
        axios.get(data.api + 'create_project/').then(res => {
            setProjects(res.data);
            localStorage.setItem('projects', JSON.stringify(res.data));
            setloading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [setProjects]);

    if (loading) {
        return (
            <>
                <Center bg='transparent' h='100vh'>
                    Loading........
                </Center>
            </>
        );
    }
    
    return (
        <>
            <Center bg='transparent' h='70vh' mx={5}>
                <Stack spacing={4} w={['75%', '50%']}>
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
                    <Button onClick={onSubmit} colorScheme='orange'>Create Project</Button>
                    <Divider />
                </Stack>
            </Center>
            <Center mb={10}>
                <Heading align='center' fontSize={['lg', 'lg', '3xl']} >Current Projects</Heading>
            </Center>
            <Center my={5}>
                <VStack w={['75%', '50%']} mx={4}>
                    {projects.length !== 0 ? projects.map(project => {
                        return (
                            <Box borderRadius='xl' py={4} bg='orange.400' w='100%' key={project.id}>
                                <HStack mx={5} spacing={3}>
                                    <Text isTruncated fontSize={['lg', 'xl']}>
                                        {project.wiki_title}
                                    </Text>
                                    <Spacer />
                                    <Button onClick={() => {window.location.pathname = '/project/' + project.id}} colorScheme='cyan'>
                                        View
                                    </Button>
                                </HStack>
                            </Box>
                        );
                    }) : (
                        <>
                            <Text>
                                No Content
                            </Text>
                        </>
                    )}
                </VStack>
            </Center>
        </>
    );
}

export default Home;