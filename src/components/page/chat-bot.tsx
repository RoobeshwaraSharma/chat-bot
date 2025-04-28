"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getChatResponse } from "@/lib/services/chat-service";
import { formatResponse } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ChatBot() {
  const [messages, setMessages] = useState<
    { role: "BOT" | "USER"; message: string }[]
  >([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      // Add user message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "USER", message: userInput },
      ]);
      // Clear input field
      setUserInput("");
      try {
        setIsMessageLoading(true);
        const botResponse = await getChatResponse(userInput);

        const formattedMessage = formatResponse(botResponse.response);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "BOT", message: formattedMessage },
        ]);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        toast.error("Error occured!", { description: errorMessage });
      } finally {
        setIsMessageLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4 max-h-[420px]"
        style={{ height: "420px" }}
      >
        {/* Chat messages */}
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "USER" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`text-sm p-3 max-w-3/4 rounded-lg text-white ${
                  message.role === "USER" ? "bg-gray-600" : "bg-gray-500"
                }`}
              >
                {message.role === "BOT" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: message.message,
                    }}
                  />
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
        {isMessageLoading && <Spinner />}
      </div>

      <div className="mt-4 flex space-x-2">
        {/* Input field for user to type message */}
        <Input
          className="flex-1 p-3 rounded-lg border-2 hover:border-gray-400 focus:ring-2 focus:ring-gray-300 text-gray-900"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress} // Trigger on "Enter" key press
          placeholder="Type a message..."
        />
        {/* Send button */}
        <Button
          variant="secondary"
          onClick={handleSendMessage}
          className="bg-transparent border  hover:bg-gray-500 rounded-lg disabled:bg-gray-400 cursor-pointer"
          disabled={isMessageLoading}
        >
          <FaArrowAltCircleUp />
        </Button>
      </div>
    </div>
  );
}
