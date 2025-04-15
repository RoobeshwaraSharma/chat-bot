import axios from "axios";

export const getChatResponse = async (
  query: string
): Promise<{
  response: string;
}> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  try {
    const response = await axios.post(`${backendUrl}/chatgpt`, { query });
    return response.data as { response: string };
  } catch (err) {
    // Catching specific network errors like connection issues
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        // Network errors (e.g., server down, no internet connection)
        throw new Error(
          "Server is not available. Please check your internet connection."
        );
      } else {
        // Handle different HTTP status codes
        if (err.response.status === 500) {
          throw new Error(
            "The server encountered an error. Please try again later."
          );
        } else if (err.response.status === 404) {
          throw new Error(
            "Requested resource not found. Please check the URL."
          );
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
