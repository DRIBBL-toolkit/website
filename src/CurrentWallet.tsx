import React, { useEffect, useState } from 'react';
import { Wallet } from 'ethers';
import { getAuthToken } from './api';

const genereWallet = () => {
  const wallet = Wallet.createRandom();
  return wallet;
};

const copyToClipboard = (text: string | undefined) => {
  if (text) navigator.clipboard.writeText(text);
};

const generateAuthToken = async (wallet: Wallet) => {
  const signature = await wallet.signMessage(
    'Welcome back to PhrazeBoard, valued participant!'
  );

  const body = {
    address: wallet.address,
    message: 'Welcome back to PhrazeBoard, valued participant!',
    signature,
  };

  return await getAuthToken(body);
};

const CurrentWallet = ({
  guessesLeft,
  setAuthToken,
  setGuessesLeft,
}: {
  guessesLeft: number;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  setGuessesLeft: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentWallet, setCurrentWallet] = useState<Wallet>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    createWallet();
  }, []);

  const createWallet = async () => {
    setIsLoading(true);
    const wallet = genereWallet();
    const authToken = await generateAuthToken(wallet);
    setGuessesLeft(3);
    setCurrentWallet(wallet);
    setAuthToken(authToken);
    setIsLoading(false);
  };

  return (
    <div className="w-1/4 rounded-lg border shadow-md bg-gray-800 border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Private key
            </h5>
            <span
              className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => {
                copyToClipboard(currentWallet?.privateKey);
              }}
            >
              {currentWallet?.privateKey.slice(0, 10)}...
            </span>
          </div>
          <div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Address
            </h5>
            <span
              className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => {
                copyToClipboard(currentWallet?.address);
              }}
            >
              {currentWallet?.address.slice(0, 10)}...
            </span>
          </div>
        </div>

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Guesses Remaining
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {guessesLeft}
        </span>
        <button
          className="flex h-10 mt-6 space-x-3 items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          onClick={createWallet}
        >
          {isLoading ? (
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            ''
          )}
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default CurrentWallet;
