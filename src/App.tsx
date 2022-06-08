import React, { useState } from 'react';
import CurrentClue from './CurrentClue';
import CurrentAccount from './CurrentWallet';
import MakeGuess from './MakeGuess';

function App() {
  const [authToken, setAuthToken] = useState('');
  const [clueUUID, setClueUUID] = useState('');
  console.log(clueUUID);
  console.log(authToken);
  return (
    <div className="bg-slate-800 grid place-items-center h-screen">
      <CurrentAccount setAuthToken={setAuthToken} />
      <div className="grid grid-cols-3 gap-32">
        <CurrentClue setClueUUID={setClueUUID} authToken={authToken} />
        <MakeGuess clueUUID={clueUUID} authToken={authToken} />
        <MakeGuess clueUUID={clueUUID} authToken={authToken} />
      </div>
    </div>
  );
}

export default App;
