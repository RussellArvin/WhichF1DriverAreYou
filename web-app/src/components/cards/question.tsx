import React, { useState, useEffect } from 'react';
import { ResultDriver } from "~/app/types/ResultDriver";
import { Question } from "~/app/types/Question";
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Textarea } from "~/components/ui/textarea"
import { useQuizStore } from "~/app/store";
import { api } from "~/trpc/react";

export interface QuestionCardProps {
  question: Question;
}

const QuestionFooter = ({ isInputValid }: {isInputValid: boolean}) => {
  const { nextQuestion, questions, currentQuestionIndex, setDriver, answers, setIsAILoading } = useQuizStore();

  const getDriverQuery = api.post.getDriver.useQuery({ answers }, {
    enabled: false,
  });

  const handleSubmit = async () => {
    setIsAILoading(true);
    try {
      const result = await getDriverQuery.refetch();
      if (result.data) {
        setDriver(result.data);
      }
    } catch (error) {
      console.error("Error fetching driver:", error);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (isInputValid) {
      nextQuestion();
    }
  };

  return (
    <CardFooter className="flex justify-between">
      <div></div>
      {questions.length - 1 === currentQuestionIndex  
        ? <Button onClick={handleSubmit} disabled={getDriverQuery.isLoading || !isInputValid}>
            {getDriverQuery.isLoading ? "Loading..." : "Submit"}
          </Button> 
        : <Button onClick={handleNextQuestion} disabled={!isInputValid}>Next</Button>
      }
    </CardFooter>
  );
};

export const QuestionMCQCard = (props: QuestionCardProps) => {
  const { title, answers } = props.question;
  const { setAnswer, currentQuestionIndex } = useQuizStore();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setSelectedValue(""); // Reset selected value when question changes
  }, [currentQuestionIndex]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    setAnswer(value);
  };

  return (
    <Card style={{ width:"32rem" }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Please choose one option</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedValue} onValueChange={handleRadioChange}>
          {answers!.map((answer, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem value={answer} id={`r${index + 1}`} />
              <Label htmlFor={`r${index + 1}`}>{answer.charAt(0).toUpperCase() + answer.slice(1)}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <QuestionFooter isInputValid={selectedValue !== ""} />
    </Card>
  )
}

export const QuestionOpenCard = (props: QuestionCardProps) => {
  const { title } = props.question;
  const { setAnswer, currentQuestionIndex } = useQuizStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(""); // Reset input value when question changes
  }, [currentQuestionIndex]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setAnswer(value);
  };

  return (
    <Card style={{ width:"32rem" }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>You may answer the question however you see fit!</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          value={inputValue}
          onChange={handleTextareaChange} 
          placeholder="Type your message here." 
        />
      </CardContent>
      <QuestionFooter isInputValid={inputValue.trim() !== ""} />
    </Card>
  )
}