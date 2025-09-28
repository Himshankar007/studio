// This is a server-side file.
'use server';

/**
 * @fileOverview AI Thangka Explorer flow that provides insights and information about
 * different elements and symbolism within a Thangka image.
 * 
 * - aiThangkaExplorer - A function that takes an image data URI and returns
 *   information about the Thangka, its elements, and symbolism.
 * - AIThangkaExplorerInput - The input type for the aiThangkaExplorer function.
 * - AIThangkaExplorerOutput - The return type for the aiThangkaExplorer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIThangkaExplorerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a Thangka, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIThangkaExplorerInput = z.infer<typeof AIThangkaExplorerInputSchema>;

const AIThangkaExplorerOutputSchema = z.object({
  description: z.string().describe('A detailed description of the Thangka, including its key elements and symbolism.'),
  elements: z.array(z.string()).describe('A list of the key elements identified in the Thangka.'),
  symbolism: z.record(z.string(), z.string()).describe('A dictionary of the symbolism associated with each element in the Thangka.'),
});
export type AIThangkaExplorerOutput = z.infer<typeof AIThangkaExplorerOutputSchema>;

export async function aiThangkaExplorer(input: AIThangkaExplorerInput): Promise<AIThangkaExplorerOutput> {
  return aiThangkaExplorerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiThangkaExplorerPrompt',
  input: {schema: AIThangkaExplorerInputSchema},
  output: {schema: AIThangkaExplorerOutputSchema},
  prompt: `You are an expert in Tibetan Buddhist art, specializing in Thangka paintings.

You will analyze the provided Thangka image and provide a detailed description of the painting, including its key elements and symbolism. Identify the main figures, deities, and symbols present in the image.

Analyze the Thangka provided in the photo, and based on it, generate the output described by the output schema.  The description should be concise but informative.  The elements array should include the key figures, deities, and symbols present in the image.  The symbolism object should describe the meaning behind each element.

Thangka Photo: {{media url=photoDataUri}}
`,
});

const aiThangkaExplorerFlow = ai.defineFlow(
  {
    name: 'aiThangkaExplorerFlow',
    inputSchema: AIThangkaExplorerInputSchema,
    outputSchema: AIThangkaExplorerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
