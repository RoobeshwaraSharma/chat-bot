"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRobot } from "react-icons/fa";
import Popup, { PopupHandle } from "@/components/ui/popup";
import ChatBot from "@/components/page/chat-bot";

export default function Home() {
  const formPopupRef = useRef<PopupHandle>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const onOpenChatBot = () => {
    if (formPopupRef) {
      formPopupRef.current?.open();
    }
  };

  // Show tooltip after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  // Hide tooltip after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.srilanka.travel/image/travel-new-images/Cover-banner.jpg')", // Replace with the background image URL
      }}
    >
      {/* Overlay to darken the background for text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Main content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-6xl font-bold">AN ISLAND ESCAPE AWAITS YOU</h1>
        <div className="mt-8">
          <input
            type="text"
            className="p-4 rounded-lg text-white w-96 border-white border hover:border-amber-200 hover:shadow"
            placeholder="Type place name..."
          />
          <Button
            variant="ghost"
            className="ml-4 px-8 py-2 border-white border"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Chatbot popup trigger button */}
      <div className="absolute bottom-4 right-4">
        <FaRobot
          color="#F08000" // Change this to a color that matches or complements the background
          size={100}
          onClick={onOpenChatBot}
          className="cursor-pointer p-2"
        />

        {/* Tooltip for chatbot icon */}
        {showTooltip && (
          <div className="absolute top-[-30px] right-20 bg-gray-700 text-white text-sm p-2 rounded-md shadow-lg w-48">
            {/* Close Button positioned at the top right corner, slightly overflowing */}
            <button
              className="absolute top-[-17px] right-[-5px] text-white font-bold text-lg cursor-pointer"
              onClick={handleCloseTooltip}
            >
              &times;
            </button>
            <div>
              <span>Hi, I am the Tourism Bot. How can I help you today?</span>
            </div>
          </div>
        )}
      </div>

      <Popup ref={formPopupRef} title="Tourism Chat Bot">
        <ChatBot />
      </Popup>
    </div>
  );
}
