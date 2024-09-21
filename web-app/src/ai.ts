import axios, { AxiosResponse } from 'axios';
import { ResultDriver } from './app/types/ResultDriver';
import drivers from './drivers';

// Define types for the request payload and the response
interface GenerateRequest {
  prompt: string;
}

interface GenerateResponse {
  response: string;
}

// Function to handle the request using async/await
export const getDriver = async (answers: string): Promise<ResultDriver> => {
  const generateRequest: GenerateRequest = {
    prompt: answers
  };

  try {
    const response: AxiosResponse<GenerateResponse> = await axios.post<GenerateResponse>(
      'http://localhost:8000/generate',
      generateRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const returnResponse = response.data.response;
    console.log(returnResponse)

    return drivers.find(driver => returnResponse.includes(driver.driverName)) ?? drivers[0]!

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
