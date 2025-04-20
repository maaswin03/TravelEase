"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your AI travel assistant. How can I help you plan your next adventure?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'd recommend visiting Goa for your honeymoon. It has beautiful beaches and romantic resorts.",

        "Udaipur is great in spring! The weather is mild, and the crowds are smaller than in peak tourist season.",

        "For a family vacation, consider Kerala. It has beaches, backwaters, lush greenery, and plenty of activities for kids.",

        "If you're on a budget, Himachal Pradesh offers great value with stunning landscapes, adventure activities, and rich culture.",

        "The best time to visit Kashmir is during spring (March-April) for blooming tulips or autumn (October-November) for golden chinar trees.",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg sm:w-96 p-0">
          <CardHeader className="bg-[#1E3A8A] text-white rounded-tl-lg rounded-tr-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg mt-2">
                <MessageSquare className="mr-2 h-5 w-5" />
                Travel Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-8 w-8 rounded-full p-0 text-white hover:bg-[#152C69]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="mb-1 flex items-center">
                      {message.sender === "bot" ? (
                        <Bot className="mr-1 h-3 w-3" />
                      ) : (
                        <User className="mr-1 h-3 w-3" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "user" ? "You" : "Travel Assistant"}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Ask about destinations, tips, etc."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="h-10 w-10 rounded-full bg-[#FFC107] p-0 text-[#1E3A8A]"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-[#1E3A8A] p-0 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
