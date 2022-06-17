import React, { useState } from 'react';
import CurrentClue from './CurrentClue';
import CurrentAccount from './CurrentWallet';
import MakeGuess from './MakeGuess';

function App() {
  const [authToken, setAuthToken] = useState('');
  const [clueUUID, setClueUUID] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [existsSideQuest, setExistsSideQuest] = useState(false);
  const [isSideQuestSolved, setIsSideQuestSolved] = useState(false);
  return (
    <div className="bg-slate-800 grid place-items-center h-screen">
      <CurrentAccount
        setAuthToken={setAuthToken}
        guessesLeft={guessesLeft}
        setGuessesLeft={setGuessesLeft}
      />
      <div className="grid grid-cols-3 gap-32">
        <CurrentClue
          setClueUUID={setClueUUID}
          authToken={authToken}
          setExistsSideQuest={setExistsSideQuest}
          setGuessesLeft={setGuessesLeft}
        />
        <MakeGuess
          clueUUID={clueUUID}
          authToken={authToken}
          existsSideQuest={existsSideQuest}
          isSideQuestSolved={isSideQuestSolved}
          setIsSideQuestSolved={setIsSideQuestSolved}
          setGuessesLeft={setGuessesLeft}
          type="Side Quest"
        />
        <MakeGuess
          clueUUID={clueUUID}
          authToken={authToken}
          existsSideQuest={existsSideQuest}
          isSideQuestSolved={isSideQuestSolved}
          setIsSideQuestSolved={setIsSideQuestSolved}
          setGuessesLeft={setGuessesLeft}
          type="Main Quest"
        />
      </div>
    </div>
  );
}

export default App;
