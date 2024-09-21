export type Question =  {
    title: string;
    answers: [string, string, string, string] | null;
    type: QuestionType
}
const questionTypes = ["mcq", "open"] as const;

export type QuestionType = (typeof questionTypes)[number];