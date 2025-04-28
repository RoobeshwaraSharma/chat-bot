"use server";
import { OpenAI } from "openai";

export const getChatResponseFromLlama = async (
  query: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_TOKEN; // This works because it's server-side code
    if (!apiKey) {
      throw new Error("API token is missing.");
    }
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/cerebras/v1",
      apiKey: apiKey,
    });
    const chatCompletion = await client.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      max_tokens: 500,
    });
    return (
      chatCompletion.choices[0].message.content ||
      "Sorry, I couldn’t understand your query."
    );
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      // Check if it's a network error
      if (err.message.includes("Network Error")) {
        throw new Error(
          "Server is not available. Please check your internet connection."
        );
      }

      // Check if the error contains a specific status code
      if (err.message.includes("403")) {
        throw new Error("Access denied. Please check your API key.");
      }

      if (err.message.includes("404")) {
        throw new Error(
          "Requested resource not found. Please check the model ID."
        );
      }

      if (err.message.includes("500")) {
        throw new Error(
          "The server encountered an error. Please try again later."
        );
      }

      // Default error message
      throw new Error("An unexpected error occurred. Please try again.");
    } else {
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
};
