"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  MessageCircle,
  Dumbbell,
  Rocket,
  Laptop,
  BookOpen,
  Flag,
  Building,
  Apple,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import davidGogginsImage from "@/assets/david-goggins.png";
import elonMuskImage from "@/assets/elon-musk.png";
import hiteshSirImage from "@/assets/hitesh-sir.png";
import manuPaajiImage from "@/assets/manu-paaji.png";
import piyushSirImage from "@/assets/piyush-sir.png";
import presidentObamaImage from "@/assets/president-obama.png";
import presidentTrumpImage from "@/assets/president-trump.png";
import steveJobsImage from "@/assets/steve-jobs.png";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

interface Persona {
  id: PersonaNames;
  name: string;
  role: string;
  avatar: StaticImageData;
  icon: React.ReactNode;
  description: string;
  color: string;
  social: string;
}

type PersonaNames =
  | "david-goggins"
  | "elon-musk"
  | "hitesh-sir"
  | "manu-paaji"
  | "piyush-sir"
  | "president-obama"
  | "president-trump"
  | "steve-jobs";

const personas: Persona[] = [
  {
    id: "piyush-sir",
    name: "Piyush Garg",
    role: "Educator, Entrepreneur",
    avatar: piyushSirImage,
    icon: <BookOpen className="w-4 h-4" />,
    description:
      "Teacher and mentor helping students excel in computer science.",
    color: "bg-purple-100 text-purple-800",
    social: "https://x.com/piyushgarg_dev",
  },
  {
    id: "hitesh-sir",
    name: "Hitesh Choudhary",
    role: "Educator, Entrepreneur",
    avatar: hiteshSirImage,
    icon: <GraduationCap className="w-4 h-4" />,
    description:
      "Renowned software engineer and educator guiding developers worldwide.",
    color: "bg-indigo-100 text-indigo-800",
    social: "https://x.com/Hiteshdotcom",
  },
  {
    id: "manu-paaji",
    name: "Manu Arora",
    role: "Entrepreneur",
    avatar: manuPaajiImage,
    icon: <Laptop className="w-4 h-4" />,
    description:
      "Indie hacker and founder of Aceternity, building tools for developers.",
    color: "bg-emerald-100 text-emerald-800",
    social: "https://x.com/mannupaaji",
  },

  {
    id: "elon-musk",
    name: "Elon Musk",
    role: "Entrepreneur",
    avatar: elonMuskImage,
    icon: <Rocket className="w-4 h-4" />,
    description:
      "CEO of SpaceX and Tesla, pushing innovation in space and technology.",
    color: "bg-sky-100 text-sky-800",
    social: "https://x.com/elonmusk",
  },

  {
    id: "david-goggins",
    name: "David Goggins",
    role: "Motivational Speaker",
    avatar: davidGogginsImage,
    icon: <Dumbbell className="w-4 h-4" />,
    description:
      "Former Navy SEAL and ultramarathon runner known for mental toughness.",
    color: "bg-amber-100 text-amber-800",
    social: "https://x.com/davidgoggins",
  },

  {
    id: "president-obama",
    name: "Barack Obama",
    role: "44th U.S. President",
    avatar: presidentObamaImage,
    icon: <Flag className="w-4 h-4" />,
    description: "Leader known for hope, change, and inspirational speeches.",
    color: "bg-blue-100 text-blue-800",
    social: "https://x.com/BarackObama",
  },
  {
    id: "president-trump",
    name: "Donald Trump",
    role: "45th & 47th U.S. President",
    avatar: presidentTrumpImage,
    icon: <Building className="w-4 h-4" />,
    description: "Businessman and political figure recognized worldwide.",
    color: "bg-red-100 text-red-800",
    social: "https://x.com/realDonaldTrump",
  },
  {
    id: "steve-jobs",
    name: "Steve Jobs",
    role: "Co-founder of Apple",
    avatar: steveJobsImage,
    icon: <Apple className="w-4 h-4" />,
    description:
      "Visionary innovator behind Apple, iPhone, and modern design thinking.",
    color: "bg-gray-100 text-gray-800",
    social: "https://www.apple.com/in/",
  },
];

const quickReplies = [
  "Tell me about yourself",
  "What's your expertise?",
  "Can you help me with a problem?",
  "What would you recommend?",
  "Share some insights",
];

// Typing Indicator Component
const TypingIndicator: React.FC<{ persona: Persona }> = ({ persona }) => {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage
          src={persona.avatar.src || "/placeholder.svg"}
          alt={persona.name}
        />
        <AvatarFallback>
          {persona.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[70%] p-4 rounded-lg bg-muted text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium font-serif">
            {persona.name} is typing
          </span>
          <div className="flex gap-1 ml-2">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const formatMessage = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, pIndex) => {
      if (paragraph.match(/^\d+\.\s\*\*/)) {
        return (
          <div key={pIndex} className="mb-4">
            {formatParagraph(paragraph)}
          </div>
        );
      }

      return (
        <div key={pIndex} className="mb-3 last:mb-0">
          {formatParagraph(paragraph)}
        </div>
      );
    });
  };

  const formatParagraph = (text: string) => {
    const numberedMatch = text.match(/^(\d+\.\s)(.+)/);
    if (numberedMatch) {
      const [, number, content] = numberedMatch;
      return (
        <div className="flex gap-3 items-start">
          <span className="font-bold text-primary min-w-[2rem] mt-0.5 flex-shrink-0 font-sans">
            {number}
          </span>
          <div className="flex-1">{formatInlineContent(content)}</div>
        </div>
      );
    }

    return formatInlineContent(text);
  };

  const formatInlineContent = (text: string) => {
    const parts: (string | React.ReactNode)[] = [];
    let currentIndex = 0;
    const allMatches: Array<{
      type: "bold" | "link";
      start: number;
      end: number;
      content: string;
      url?: string;
    }> = [];

    // Find bold text
    let boldMatch;
    const boldRegex = /\*\*(.*?)\*\*/g;
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      allMatches.push({
        type: "bold",
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[0].length,
        content: boldMatch[1],
      });
    }

    // Find links
    let linkMatch;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      allMatches.push({
        type: "link",
        start: linkMatch.index,
        end: linkMatch.index + linkMatch[0].length,
        content: linkMatch[1],
        url: linkMatch[2],
      });
    }

    allMatches.sort((a, b) => a.start - b.start);

    allMatches.forEach((match, index) => {
      if (match.start > currentIndex) {
        parts.push(text.slice(currentIndex, match.start));
      }

      if (match.type === "bold") {
        parts.push(
          <strong key={`bold-${index}`} className="font-bold font-sans">
            {match.content}
          </strong>
        );
      } else if (match.type === "link") {
        parts.push(
          <a
            key={`link-${index}`}
            href={match.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium break-words transition-colors duration-200"
          >
            {match.content}
          </a>
        );
      }

      currentIndex = match.end;
    });

    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.length === 0 ? text : parts;
  };

  return (
    <div className="space-y-2 leading-relaxed">{formatMessage(content)}</div>
  );
};

export default function ChatBotPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Ensure focus comes back after message send
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, userMessage],
          persona: selectedPersona,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.data,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add error handling UI here
      toast.error("Failed to send message. Please see logs for more details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona);
    setMessages([]);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  // Handle scroll detection
  const handleScroll = (): void => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      // Calculate current page for indicators
      const firstChild = carouselRef.current.children[0] as HTMLElement;
      const itemWidth = (firstChild?.offsetWidth || 0) + 8; // item width + gap
      const visibleItems = Math.floor(clientWidth / itemWidth);
      const currentPageNum = Math.floor(
        scrollLeft / (itemWidth * visibleItems)
      );
      setCurrentPage(currentPageNum);
    }
  };

  // Scroll carousel left or right
  const scrollCarousel = (direction: "left" | "right"): void => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8; // Scroll 80% of visible width
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Initialize scroll state on mount and when personas change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => clearTimeout(timer);
  }, [personas]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
      <div className="container mx-auto h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 bg-card/50 w-full mt-2">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold font-sans">
                AI Personas & Roleplay
              </h1>
              <p className="text-muted-foreground text-lg font-serif">
                Chat with experts, celebrities, and professionals
              </p>
            </div>
          </div>

          {/* Persona Carousel */}
          <div className="relative mt-5">
            <div className="flex items-center">
              {/* Left Navigation Button */}
              <button
                onClick={() => scrollCarousel("left")}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors mr-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Carousel Container */}
              <div
                ref={carouselRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-2 flex-1"
                onScroll={handleScroll}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {personas.map((persona) => (
                  <Button
                    key={persona.id}
                    variant={
                      selectedPersona.id === persona.id ? "default" : "outline"
                    }
                    size="default"
                    onClick={() => handlePersonaChange(persona)}
                    className="flex items-center gap-2 whitespace-nowrap cursor-pointer text-base flex-shrink-0"
                  >
                    {persona.icon}
                    {persona.name}
                  </Button>
                ))}
              </div>

              {/* Right Navigation Button */}
              <button
                onClick={() => scrollCarousel("right")}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors ml-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        <div className="flex gap-6 p-6 justify-between w-full flex-wrap">
          {/* Persona Info Sidebar */}
          <Card className="w-80 p-6 h-fit">
            <Link
              href={selectedPersona.social}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={selectedPersona.avatar.src || "/placeholder.svg"}
                    alt={selectedPersona.name}
                  />
                  <AvatarFallback>
                    {selectedPersona.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold font-sans text-xl">
                    {selectedPersona.name}
                  </h3>
                  <Badge
                    className={
                      selectedPersona.color + " text-sm font-normal mt-1"
                    }
                  >
                    {selectedPersona.role}
                  </Badge>
                </div>
              </div>
            </Link>
            <p className="text-black text-base font-serif mb-6">
              {selectedPersona.description}
            </p>

            {/* Quick Replies */}
            <div className="space-y-2">
              <h4 className="font-semibold font-sans">Quick Starters:</h4>
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleQuickReply(reply)}
                  className="w-full justify-start text-left h-auto px-3 font-serif text-base cursor-pointer"
                  disabled={isLoading}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </Card>

          {/* Chat Interface */}
          <Card className="flex-1 flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage
                          src={selectedPersona.avatar.src || "/placeholder.svg"}
                          alt={selectedPersona.name}
                        />
                        <AvatarFallback>
                          {selectedPersona.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto font-serif"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="font-serif">
                          <FormattedMessage content={message.content} />
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && <TypingIndicator persona={selectedPersona} />}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask ${selectedPersona.name} anything...`}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 font-serif bg-white text-lg font-normal p-2 border border-orange-300"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-4 h-4 cursor-pointer" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
