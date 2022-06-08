import React, { useState } from 'react';
import { getClueUUID } from './api';

const CurrentClue = ({
  setClueUUID,
  authToken,
}: {
  authToken: string;
  setClueUUID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentClue, setCurrentClue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const getClue = async (currentClue: number) => {
    setIsLoading(true);
    setIsErrored(false);
    try {
      const UUID = await getClueUUID(currentClue, authToken);
      setClueUUID(UUID);
    } catch (err) {
      console.log(err);
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
