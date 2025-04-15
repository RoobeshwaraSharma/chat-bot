import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to format the bot's response
export const formatResponse = (response: string) => {
  // Replace line breaks with <br> tags for proper formatting
  let formattedResponse = response.replace(/\n/g, "<br/>");

  // Format titles with '**' by making them bold and increasing the font size
  formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert bullet points (starting with '*' or '-') to <ul> and <li>
  formattedResponse = formattedResponse.replace(
    /^\s*[\*\-\•]\s+(.*)$/gm,
    "<ul><li>$1</li></ul>"
  );

  // Convert numbered lists (starting with '1.', '2.', etc.) to <ol> and <li>
  formattedResponse = formattedResponse.replace(
    /^\s*\d+\.\s+(.*)$/gm,
    "<ol><li>$1</li></ol>"
  );

  // Wrap paragraphs in <p> tags for proper separation
  formattedResponse = formattedResponse.replace(/\n/g, "</p><p>");
  formattedResponse = `<p>${formattedResponse}</p>`; // Wrap the entire response in <p> tags

  return formattedResponse;
};
