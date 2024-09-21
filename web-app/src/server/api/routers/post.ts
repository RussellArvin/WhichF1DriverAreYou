import { z } from "zod";
import { getDriver } from "~/ai";
import drivers from "~/drivers";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";




// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  getDriver: publicProcedure
    .input(z.object({answers: z.array(z.string())}))
    .query(async ({input}) => {
      const { answers } = input;

      const prompt = `You are tasked with identifying which current F1 driver from the 2023-2024 grid best matches the following profile based on their racing style, mentality, and approach. 
      It is important that the chosen driver reflects the unique characteristics of the responses given. Each driver on the grid has specific attributes, and you should select the driver that best matches these traits.
      Do not default to selecting Lewis Hamilton unless he clearly matches all traits better than any other driver. You must evaluate all drivers, especially considering their specific strengths and tendencies. Avoid selecting the same driver repeatedly.
      
      Here are the answers:
      1. Race day preparation: ${answers[0]}
      2. Overtaking strategy: ${answers[1]}
      3. Handling mistakes: ${answers[2]}
      4. Racing excitement: ${answers[3]}
      5. Criticism response: ${answers[4]}
      6. Risk attitude: ${answers[5]}
      7. Ideal race scenario: ${answers[6]}
      8. What sets them apart: ${answers[7]}
      
      Choose a driver that best fits these answers from a diverse pool of drivers, taking into account different personalities and driving styles on the grid. Ensure that the driver chosen reflects the nuances in the responses and avoid frequent repetition of any one driver.`
      
      
      
      // Uncomment this to integrate AI service.
      //const driver = await getDriver(prompt)
      //return driver;

      //Comment this when AI service is integrated
      return drivers[0]!
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const post: Post = {
        id: posts.length + 1,
        name: input.name,
      };
      posts.push(post);
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return posts.at(-1) ?? null;
  }),
});
