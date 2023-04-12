// pages/api/analyzeComposition.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_KEY })
);

const GPT35TurboMessage = (objectsInfo: string) => ([
  { role: "system", content: `You are an AI trained to analyze video composition and provide recommendations based on object positions. Provide suggestions to improve the composition.` },
  {
    role: "user",
    content: `Analyze composition: ${objectsInfo}`,
  },
]);

let GPT35Turbo = async (objectsInfo: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: GPT35TurboMessage(objectsInfo),
  });

  return response.data.choices[0].message?.content;
};

type Data = {
  objectsInfo: string,
  recommendations: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const objectsInfo = req.body.objectsInfo;
        const recommendations = await GPT35Turbo(objectsInfo);
        res.status(200).json({ objectsInfo, recommendations });
      } catch (error) {
        res.status(500).json({ objectsInfo: "", recommendations: "Error generating recommendations" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
