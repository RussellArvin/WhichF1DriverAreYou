"use client"

import React from "react"
import { ResultCard } from "~/components/cards/result"
import { QuestionMCQCard, QuestionOpenCard } from "~/components/cards/question"
import { useQuizStore } from "./store"

export default function CardWithForm() {
  const { currentQuestionIndex, questions, driver } = useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Which F1 Driver are you?</h1>
        {driver ? (
          <ResultCard driver={driver} />
        ) : (
          <>
            {currentQuestion?.type === "mcq" && (
              <QuestionMCQCard
                question={currentQuestion}
              />
            )}
            {currentQuestion?.type === "open" && (
              <QuestionOpenCard
                question={currentQuestion}
              />
            )}
          </>
        )}
      </div>
      <div className="flex justify-center items-center space-x-4 p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Lenovo_Global_Corporate_Logo.png/2560px-Lenovo_Global_Corporate_Logo.png"
          alt="Lenovo Logo"
          className="w-[200px]"
        />
        <img
          src="/gignite.png"
          alt="Lenovo Logo"
          className="w-[200px]"
        />
      </div>
    </div>
  );
}