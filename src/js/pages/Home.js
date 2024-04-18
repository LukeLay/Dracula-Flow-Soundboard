import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import AudioButton from '../components/audioButton';
const { ipcRenderer } = require('electron');

const Home = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        ipcRenderer.send('request-audio-files');
        ipcRenderer.on('response-audio-files', (event, data) => {
            if (data.error) {
                console.error('Error retrieving files:', data.error);
            } else {
                // Filter out files that are not .mp3
                const mp3Files = data.files.filter(file => file.endsWith('.mp3'));
                setAudioFiles(mp3Files);
            }
        });

        // Clean up event listener on component unmount
        return () => {
            ipcRenderer.removeAllListeners('response-audio-files');
        };
    }, []);


    const filteredFiles = audioFiles.filter(file =>
        file.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const playAudio = (fileName) => {

        // If the clicked file is the same as the currently playing file, reset the audio element's playback
        if (fileName === currentFile) {
            const audioElement = document.querySelector('audio');
            if (audioElement) {
                audioElement.currentTime = 0; // Reset the playback to the beginning
                audioElement.play(); // Start playing the audio
            }
        } 
        else {
            setCurrentFile(fileName);
        }
    };

    const playRandom = () => {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const randomFile = audioFiles[randomIndex];
        playAudio(`public/audio/${randomFile}`);
    };

    const AudioButton = (props) => {

        const track = props.track;

        let fontSize = '1.2em';

        if (track.length > 24) {
            fontSize = '1em';
        }

        if (track.length > 32) {
            fontSize = '0.8em';
        }

        return (

            <>
                <Card
                    variant="primary"
                    onClick={() => playAudio(`public/audio/${track}`)}
                    style={{ margin: "auto", marginTop: "8px", width: "31%", height: "96px", cursor: "pointer", userSelect: "none", opacity: '0.8' }}
                >
                    <Card.Body
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            opacity: '1'
                        }}
                    >
                        <span style={{ fontSize }}>{track.replace('.mp3', '')}</span>
                        <div style={{ position: "absolute", bottom: "2px", right: "4px", opacity: "0" }}>{props.index + 1}</div>
                    </Card.Body>
                </Card>
            </>
        );
    }

    return (
        <>

            <Card style={{ margin: "0%", width: "100%", backgroundColor: "var(--bs-dark)" }}>
                <Card.Header style={{ backgroundColor: "var(--bs-primary)", color: "var(--bs-light)", opacity: '0.8', justifyContent: "center", display: "flex", flexDirection: "row" }}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "75%", margin: "auto", opacity: '0.8' }}
                    />

                    <Button variant="light" onClick={playRandom} style={{ margin: "auto", opacity: '0.8' }}>Random</Button>

                </Card.Header>
                <Card.Body
                    style={{
                        paddingBottom: "64px",
                        opacity: '0.8',
                        backgroundImage: `url(public/img/dracula.png)`,
                    }}
                >
                    <Container
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            alignItems: "left",
                        }}
                    >
                        {filteredFiles.map((file, index) => (
                            <React.Fragment key={index}>
                                <AudioButton track={file} index={index} />
                            </React.Fragment>
                        ))}
                    </Container>

                    <audio src={currentFile} controls autoPlay style={{
                        position: "fixed",
                        bottom: "4px",
                        left: 0,
                        right: 0,
                        width: "75%",
                        margin: "auto",
                        borderRadius: "0px",
                        opacity: '0.8'
                    }}>
                        Your browser does not support the audio element.
                    </audio>

                    {/* Return to top */}
                    <Button variant="light"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ position: "fixed", bottom: "16px", right: "16px", borderRadius: "0px", opacity: '0.8' }}
                    >
                        Return to Top
                    </Button>

                </Card.Body>
            </Card>
        </>
    );
}

export default Home;
