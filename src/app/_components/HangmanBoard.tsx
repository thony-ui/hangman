"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGetWord } from "../queries/use-get-word";
import Box from "./Box";
import Loader from "./Loader";
import {
  FIRST_ROW_OF_LETTERS,
  SECOND_ROW_OF_LETTERS,
  THIRD_ROW_OF_LETTERS,
} from "../constants/rowsOfLetters";
import FlexWrapper from "./FlexWrapper";
import Letter from "./Letter";

const TOTAL_GUESSES = 6;
function HangmanBoard() {
  const { data: wordData, isLoading, error } = useGetWord();
  const [guessState, setGuessState] = useState<string[]>([]);
  const [seenLetters, setSeenLetters] = useState<string[]>([]);
  const [totalGuesses, setTotalGuesses] = useState<number>(0);
  const answerArray: string[] = useMemo(
    () => wordData?.word.split("") || [],
    [wordData]
  );

  const handleGuess = useCallback((letter: string, answerArray: string[]) => {
    setGuessState((prev) => {
      const newGuessState = [...prev];
      for (let i = 0; i < answerArray.length; i++) {
        if (letter === answerArray[i]) {
          newGuessState[i] = letter;
        }
      }
      return newGuessState;
    });
    setTotalGuesses((prev) => prev + 1);
    setSeenLetters((prev) => [...prev, letter]);
  }, []);

  const clickTile = (letter: string) => {
    handleGuess(letter.toLowerCase(), answerArray);
  };

  const checkWinOrLose = useCallback(() => {
    if (
      guessState.length > 0 &&
      guessState.every((letter) => letter !== "") &&
      totalGuesses <= TOTAL_GUESSES &&
      !guessState.includes("!")
    ) {
      alert("You win!");
      setTotalGuesses(0);
      setGuessState(
        Array.from({ length: answerArray.length }).fill("") as string[]
      );
      setSeenLetters([]);
    } else if (totalGuesses === TOTAL_GUESSES) {
      alert("You lose!");
      setTotalGuesses(0);
      setGuessState((prev) => {
        const newGuessState = [...prev];
        for (let i = 0; i < newGuessState.length; i++) {
          if (newGuessState[i] !== "") continue;
          newGuessState[i] = "!";
        }
        return newGuessState;
      });
    }
  }, [guessState, totalGuesses, answerArray]);

  useEffect(() => {
    if (!wordData) return;
    setGuessState(
      Array.from({ length: wordData.word.length }).fill("") as string[]
    );
  }, [wordData]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const letter = e.key.toLowerCase();
      if (!letter.match(/^[a-z]$/)) return;
      handleGuess(letter, answerArray);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [answerArray, handleGuess, checkWinOrLose]);

  useEffect(() => {
    checkWinOrLose();
  }, [checkWinOrLose]);

  if (isLoading) return <Loader>Loading...</Loader>;
  if (error) return <Loader>Error...</Loader>;
  return (
    <>
      <p className="text-center">
        You have {TOTAL_GUESSES - totalGuesses} tries left
      </p>
      <div className="flex gap-2">
        {answerArray.map((_, i) => (
          <Box key={i} letter={guessState[i]} actualLetter={answerArray[i]} />
        ))}
      </div>
      <FlexWrapper>
        {FIRST_ROW_OF_LETTERS.map((letter, i) => (
          <Letter
            handleClick={clickTile}
            letter={letter}
            key={i}
            disabled={seenLetters.includes(letter.toLowerCase())}
          />
        ))}
      </FlexWrapper>
      <FlexWrapper>
        {SECOND_ROW_OF_LETTERS.map((letter, i) => (
          <Letter
            key={i}
            handleClick={clickTile}
            letter={letter}
            disabled={seenLetters.includes(letter.toLowerCase())}
          />
        ))}
      </FlexWrapper>
      <FlexWrapper>
        {THIRD_ROW_OF_LETTERS.map((letter, i) => (
          <Letter
            key={i}
            handleClick={clickTile}
            letter={letter}
            disabled={seenLetters.includes(letter.toLowerCase())}
          />
        ))}
      </FlexWrapper>
    </>
  );
}

export default HangmanBoard;
