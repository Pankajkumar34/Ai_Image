"use client"
import { Configuration, OpenAIApi } from 'openai';

export const Dalle = async (prompt, key) => {
  const configuration = new Configuration({
    apiKey: key,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: `${prompt}`,
    n: 1,
    size: '512x512',
  });

  return response;
};
