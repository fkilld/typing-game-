import React, {useState, useEffect} from 'react';
import Words from "./components/Words";
import Container from "./components/Container";
import Typeracer from './components/Typeracer';
import Results from './components/Results';
import './App.css';


const  App = () => {
    const [word, setWord] = useState(Words);
    const [newWord, setNewWord] = useState(word[0]);
    const [disabled, setDisabled] = useState(true);
    const [currectResults, setCurrectResults] = useState([]);
    const [wrongResults, setWrongResults] =  useState([]);
    const [countCorrect, setCountCorrect] =  useState([0]);
    const [time,setTime] = useState([30]);
    const [inputValue, setInputValue] = useState('');
    const [animation, setAnimation] = useState(null);

    let randomWord = Math.floor(Math.random() * word.length);

    const checkAnswer = () => {
        if (inputValue.trim() === newWord) {
            setCurrectResults((prevCorrect) => [...prevCorrect, newWord]);
            setCountCorrect((prevCorrect) => prevCorrect + 1);
            return;
        }
        setWrongResults((prevWrong) => [...prevWrong, inputValue]);
    };

    const handleInput = e => {
        if (e.charCode ===13 && inputValue.trim() !== ''){
            checkAnswer();
            setNewWord(word[randomWord]);
            setInputValue('');
        }

    };

    const handleStart = () => {
        setDisabled(!disabled);
        setCurrectResults([]);
        setWrongResults([]);
        setCountCorrect(0);
        setInputValue('');
    }

    useEffect(() => {
        if(time <= 30 && time !== 0 && disabled === false ){
            setTimeout(() => setTime(prevTime => prevTime - 1), 1000);
        }else if(disabled) {
            setTimeout(30);
            setAnimation(null);
        } else if(time === 0){
            setDisabled(true);
        }

        if(time <= 10){
            setAnimation('scaleNumer 2s infinite');
        }
    }, [disabled, time]);

    useEffect(() => {
        setNewWord(word[randomWord]);
    }, []);

    return (
        <div className="App">
            <Container>
                <Typeracer
                    newWord={newWord}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    disabled={disabled}
                    time={time}
                    animation={animation}
                    handleInput={handleInput}
                    handleStart={handleStart}
                />
            </Container>
            <Results
                correctResults={currectResults}
                wrongResults={wrongResults}
                countResults={countCorrect}
            />

        </div>
    );
}

export default App;
