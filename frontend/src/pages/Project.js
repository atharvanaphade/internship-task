import { Center, Heading, VStack, Text, Button, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { ReactTransliterate } from "react-transliterate";
import data from '../lib/variables';

const languages = {
    'hi': 'Hindi',
    'bn': 'Bengali',
    'pa': 'Punjabi',
    'ta': 'Tamil',
    'te': 'Telugu',
};

const Project = (props) => {
    const params = useParams();
    const [project, setProject] = React.useState({content: [{sentence: '', trans_sentence: ''}], title: ''});
    const [idx, setIdx] = React.useState(0);
    const [loading, setloading] = React.useState(true);
    const projectList = JSON.parse(localStorage.getItem('projects'));
    const proj = projectList.filter(pr => pr.id === parseInt(params.id));

    React.useEffect(() => {
        axios.get(data.api + 'sentences/' + params.id)
        .then(res => {
            setProject(res.data);
            setloading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [setProject]);

    const translateSentence = () => {
        const payload = {
            id: project.content[idx].id,
            translated_sentence: project.content[idx].trans_sentence,
        }
        axios.put(data.api + 'sentences/' + params.id, payload)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    };

    console.log(projectList);
    console.log(proj);

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
            <VStack w='100%'>
                <Heading my={5}>
                    Wikipedia Title : {project.title}
                </Heading>
                <Heading my={5}>
                    Sentence Id : {project.content[idx].id}
                </Heading>
                <Text>Language : {languages[proj[0].target_lang]}</Text>
                <Center h='60vh' w="100%">
                    <Center mr={100} w='100%'>
                        <VStack>
                                <Heading>
                                    Orignal Sentence
                                </Heading>
                                <Text my={10} align={'center'} w='50%'>
                                    {project.content[idx].sentence}
                                </Text>
                                <Button colorScheme='orange' onClick={() => {
                                    if (idx > 0) {
                                        setIdx(idx - 1);
                                    }
                                }}>Previous</Button>
                        </VStack>
                    </Center>
                    <Center ml={100} w='100%'>
                        <VStack>
                                <Heading>
                                    Translated Sentence
                                </Heading>
                                <ReactTransliterate renderComponent={(props => <Textarea variant='filled' {...props} />)} onChangeText={(e) => {
                                    let list = project.content;
                                    list[idx] = {
                                        id: project.content[idx].id,
                                        sentence: project.content[idx].sentence,
                                        trans_sentence: e,
                                    };
                                    setProject({
                                        ...project,
                                        content: [...list],
                                    })
                                }} value={project.content[idx].trans_sentence}
                                    lang={proj[0].target_lang}
                                />
                                <Button colorScheme='orange' onClick={() => {
                                    if (idx < (project.content.length - 1)) {
                                        setIdx(idx + 1);
                                    }
                                }}>Next</Button>
                        </VStack>
                    </Center>
                </Center>
                <Button onClick={translateSentence} colorScheme='orange'>Translate</Button>
                <Button onClick={() => window.location.pathname = '/'} colorScheme='orange'>Home</Button>
            </VStack>
        </>
    );
}

export default Project;