

import { callOjFromServer } from './callOjFromServer';
import {getLocalStroage} from '../lib/windowError';

const key = process.env.REACT_APP_OPEN_AI_KEY;

// Modify the code below to handle localStorage access

const modelsManager = async (aiModel, cleanPrompt, updateMessage, setThinking) => {
let email =getLocalStroage()
  try {
    switch (aiModel) {
      case 'OpenJourney':
        await OJ(cleanPrompt, updateMessage, aiModel,email);
        break;
      default:
        console.log("Not selected model");
    }
  } catch (e) {
    alert("Server error, please try later");
    console.error("model manager err: ", e);
  }

  setThinking(false);
};

async function OJ(cleanPrompt, updateMessage, aiModel,email) {
 

  try {
    
    const data = await callOjFromServer(cleanPrompt, email);
    data && updateMessage(!email?"Log in first":data, true, aiModel);
  } catch (e) {
    alert("OJ not working, please try later");
    console.log("OJ error: ", e);
  }
}

export default modelsManager;


