import React, { useState, useEffect, useMemo } from "react";
import { FaMicrophone } from "react-icons/fa";
import Dropdown from "./components/Dropdown";
import { twMerge } from "tailwind-merge";
import { ReactTyped } from "react-typed";
import Dots from "./components/Dots";

const App: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("de");

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:3000/translate";
  const recognition = useMemo(
    () => new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
    []
  );

  useEffect(() => {
    // Function to call the backend API for translation
    const translate = async (text: string) => {
      setIsTranslating(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, fromLang, toLang }),
        });

        const data = await response.json();
        setIsTranslating(false);
        setTranslatedText(data.translatedText);
      } catch (error) {
        console.error("Translation error:", error);
        setIsTranslating(false);
        setTranslatedText("Error translating text");
      }
    };

    recognition.lang = fromLang;
    recognition.interimResults = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      translate(transcript);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
  }, [fromLang, recognition, API_URL, toLang]);

  // Start listening for voice input
  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  return (
    <div
      className={twMerge(
        "from-white via-slate-100 to-slate-50 text-slate-700",
        "dark:from-black dark:via-slate-950 dark:to-gray-950 dark:text-white",
        "bg-gradient-to-br min-h-screen flex flex-col items-center justify-start pt-[18vh] gap-8"
      )}
    >
      <h1 className="text-2xl lg:text-5xl font-normal text-center mb-4">
        AI Powered Voice Commanded <br /> Language Translator
      </h1>

      <Dropdown
        setLang={(lang, dir) => {
          if (dir === "from") setFromLang(lang.code);
          if (dir === "to") setToLang(lang.code);
        }}
      />

      <div className="relative mt-8">
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-ping absolute h-48 w-48 rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 dark:from-blue-500 dark:via-sky-800 dark:to-cyan-400 opacity-35 blur-lg"></div>
            <div className="animate-ping absolute h-32 w-32 rounded-full bg-gradient-to-r from-cyan-200 via-purple-400 to-blue-400 dark:from-blue-500 dark:via-purple-800 dark:to-cyan-400 p-2 blur-sm">
              <div className="flex h-full rounded-full w-full items-center justify-center bg-slate-300  dark:bg-slate-950 front"></div>
            </div>
          </div>
        )}
        <button
          onClick={startListening}
          className={`relative ${isListening ? "animate-pulse" : ""}`}
        >
          <div className="mx-auto rounded-full flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-cyan-200 via-purple-400 to-blue-400 dark:from-blue-500 dark:via-purple-800 dark:to-cyan-400 p-1 shadow-xl">
              <div className="flex h-full rounded-full w-full items-center justify-center bg-slate-50  dark:bg-slate-950 back">
                <FaMicrophone
                  size={48}
                  className="text-slate-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="text-center">
        <p className="text-xl italic text-gray-600 dark:text-gray-400">
          {inputText && (
            <>
              "
              <ReactTyped
                strings={[inputText]}
                showCursor={false}
                typeSpeed={80}
              />
              "
            </>
          )}
        </p>
        <h2 className="text-4xl font-semibold">
          {isTranslating ? (
            <Dots />
          ) : (
            translatedText && (
              <ReactTyped
                strings={[translatedText]}
                cursorChar="."
                showCursor={true}
                typeSpeed={120}
              />
            )
          )}
          {}
        </h2>
      </div>
    </div>
  );
};

export default App;
