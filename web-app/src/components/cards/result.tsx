import { ResultDriver } from "~/app/types/ResultDriver";
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { useQuizStore } from "~/app/store";

export interface ResultCardProps  {
    driver: ResultDriver
}

export const ResultCard = (props: ResultCardProps) => {
    const { driverName, driverDescription, driverImage } = props.driver

    const { resetQuiz } = useQuizStore();

    return (
        <>
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>{driverName}</CardTitle>
                    <CardDescription>{driverDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <img 
                        src={driverImage}
                        width="400" 
                        height="400" 
                        className="mx-auto"
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={resetQuiz}>Retry</Button>
                </CardFooter>
            </Card>
        </>
    )
}