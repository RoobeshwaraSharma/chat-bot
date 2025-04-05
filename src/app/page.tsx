"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add user message to the chat
      setMessages((prevMessages) => [...prevMessages, `You: ${userInput}`]);

      // Simple bot response (can be replaced with your bot logic)
      setMessages((prevMessages) => [
        ...prevMessages,
        `Bot: You said "${userInput}"`,
      ]);

      // Clear input field
      setUserInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen p-20 bg-gray-800 text-white">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {/* Chat messages */}
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.startsWith("You:") ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`text-sm p-3 max-w-xs rounded-lg ${
                  message.startsWith("You:")
                    ? "bg-gray-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                <p>{message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {/* Input field for user to type message */}
        <Input
          className="flex-1 p-3 rounded-lg border-none focus:ring-2 focus:ring-gray-300 bg-gray-700 text-white"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress} // Trigger on "Enter" key press
          placeholder="Type a message..."
        />
        {/* Send button */}
        <Button
          variant="secondary"
          onClick={handleSendMessage}
          className="bg-gray-600 text-white hover:bg-gray-700 rounded-lg p-3"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
