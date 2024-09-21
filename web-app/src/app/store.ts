import create from 'zustand';
import { Question } from './types/Question';
import { ResultDriver } from './types/ResultDriver';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: string[]
  driver: ResultDriver | null;
  isAILoading: boolean;
  setAnswer: (answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  setDriver: (driver: ResultDriver) => void;
  checkAllAnswers: () => boolean;
  setIsAILoading: (loading: boolean) => void;
}

export const useQuizStore = create<QuizState>((set,get) => ({
    questions: [
        {
            title: "How do you approach race day preparation?",
            answers: [
                "Meticulously plan every detail and stick to a routine.",
                "Stay relaxed and flexible, adjusting based on the situation.",
                "Focus on mental preparation and visualization techniques.",
                "Rely on past experience or adapt strategy continuously."
            ],
            type: "mcq"
        },
        {
            title: "What is your strategy when overtaking a rival?",
            answers: [
                "Take calculated risks, waiting for the perfect moment.",
                "Dive into the first opportunity, even if it's aggressive.",
                "Outmaneuver them through technical precision.",
                "Pressure them into making a mistake and capitalize on it."
            ],
            type: "mcq"
        },
        {
            title: "How do you handle a mistake during a race?",
            answers: [
                "Shake it off quickly and refocus on the next opportunity.",
                "Analyze what went wrong and adjust your strategy accordingly.",
                "Stay calm and continue with your original plan.",
                "Push harder to make up for lost time."
            ],
            type: "mcq"
        },
        {
            title: "Which aspect of racing excites you the most?",
            answers: [
                "The thrill of speed and pushing the limits.",
                "The strategy and outsmarting opponents.",
                "The teamwork and communication with your crew.",
                "The competition and proving yourself as the best."
            ],
            type: "mcq"
        },
        {
            title: "How do you react to criticism from your team or media?",
            answers: [
                "Take it as motivation to improve.",
                "Ignore it and focus on your own goals.",
                "Reflect on it and make changes if necessary.",
                "Defend your approach and stay confident in your methods."
            ],
            type: "mcq"
        },
        {
            title: "What is your attitude towards risk on the track?",
            answers: [
                "I’m willing to take risks if the reward is worth it.",
                "I prefer to play it safe and minimize unnecessary risks.",
                "I thrive in high-risk situations and often seek them out.",
                "I take risks only when absolutely necessary."
            ],
            type: "mcq"
        },
        {
            title: "Describe your ideal race scenario and how you would navigate it.",
            answers: null,
            type: "open"
        },
        {
            title: "What do you think sets you apart from other drivers on the grid?",
            answers: null,
            type: "open"
        }
    ],
  currentQuestionIndex: 0,
  answers: [],
  driver: null,
  isAILoading: false,
  setAnswer: (answer: string) => set((state) => {
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = answer;
    return { answers: newAnswers };
  }),
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex < state.questions.length - 1
        ? state.currentQuestionIndex + 1
        : state.currentQuestionIndex
  })),
  previousQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex > 0
      ? state.currentQuestionIndex - 1
      : state.currentQuestionIndex,
  })),
  resetQuiz: () => set(() => ({
    currentQuestionIndex: 0,
    answers: [],
    driver: null
  })),
  setDriver: (driver: ResultDriver) => set(() => ({
    driver:driver
  })),
  checkAllAnswers: () => get().answers.every(answer => answer !== undefined && answer !== null && answer.trim() !== ''),
  setIsAILoading: (loading: boolean) => set(() => ({
    isAILoading:loading
  }))
}));
