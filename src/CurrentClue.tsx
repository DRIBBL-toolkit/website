import React, { useState } from 'react';
import { getClueById, getPuzzle } from './api';

const CurrentClue = ({
  setClueUUID,
  authToken,
  setExistsSideQuest,
  setGuessesLeft,
}: {
  authToken: string;
  setClueUUID: React.Dispatch<React.SetStateAction<string>>;
  setExistsSideQuest: React.Dispatch<React.SetStateAction<boolean>>;
  setGuessesLeft: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentClue, setCurrentClue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const getClue = async (currentClue: number) => {
    setIsLoading(true);
    setIsErrored(false);
    setExistsSideQuest(false);
    try {
      const puzzle = await getPuzzle(authToken);
      const clue = await getClueById(puzzle, currentClue);
      setGuessesLeft(clue.guesses_remaining_today);
      const UUID = clue.uuid;
      console.log(clue.checkpoint);
      if (!!clue.checkpoint) setExistsSideQuest(true);
      setClueUUID(UUID);
    } catch (err) {
      setIsErrored(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-rows-3 text-gray-50 justify-items-center items-center">
      <p>{isLoading ? 'Loading...' : ''}</p>
      <p className={`${isErrored ? 'text-red-700' : ''} h-6`}>
        {isErrored ? 'CLUE DID NOT LOAD:' : 'Set Clue Number:'}
      </p>
      <input
        value={currentClue}
        type="text"
        className="bg-gray-600  h-9 text-gray-50 text-sm rounded-lg block w-full p-2.5"
        onChange={(e) => {
          setCurrentClue(e.target.value);
          if (e.target.value === '') return;
          getClue(Number(e.target.value));
        }}
      />
    </div>
  );
};

export default CurrentClue;
