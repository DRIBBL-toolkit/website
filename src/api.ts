import axios from 'axios';
import { getTimestamp } from './utils';

const API_BASE_URL = 'https://hidden-sierra-71371.herokuapp.com/api/v1';

type body = {
  address: string;
  message: string;
  signature: string;
};

const getAuthToken = async (body: body) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/sign/?t=${getTimestamp()}`,
    body
  );

  return response.data.auth_token;
};

const getClueUUID = async (id: number, token: string) => {
  const request = await axios.get(
    `${API_BASE_URL}/puzzles/?t=${getTimestamp()}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  console.log(request);
  return request.data.puzzles[0].clues[id - 1].uuid;
};

const checkGuess = async (
  token: string,
  board: string,
  clueUUID: string,
  guess: string
) => {
  const bodyFormData = new FormData();
  bodyFormData.append('type', 'guess');
  bodyFormData.append('guess', guess);
  bodyFormData.append('slug', board);
  bodyFormData.append('clue', clueUUID);

  const request = await axios.post(
    `${API_BASE_URL}/puzzles/guess?t=${getTimestamp()}`,
    bodyFormData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const guessObject = request.data[0].clues.find(
    ({ uuid }: { uuid: string }) => uuid === clueUUID
  ).guess;

  if (guessObject) if (guessObject.correct) return true;
  return false;
};

export { getAuthToken, getClueUUID, checkGuess };
