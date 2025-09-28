// src/ai/flows/digital-mandala-builder.ts
'use server';

/**
 * @fileOverview Digital Mandala Builder AI agent.
 * Generates a mandala image based on the provided theme, symbols, colors, and style.
 *
 * - generateMandala - A function that handles the mandala generation process.
 * - GenerateMandalaInput - The input type for the generateMandala function.
 * - GenerateMandalaOutput - The return type for the generateMandala function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMandalaInputSchema = z.object({
  theme: z
    .string()
    .describe('The theme of the mandala, such as peace, love, or gratitude.'),
  symbols: z
    .string()
    .describe(
      'A comma-separated list of traditional symbols to include in the mandala, such as lotus, vajra, or dharma wheel.'
    ),
  colors: z
    .string()
    .describe(
      'A comma-separated list of colors to use in the mandala, such as gold, red, or blue.'
    ),
  style: z
    .string()
    .describe(
      'The art style to use for the mandala, such as geometric, abstract, or realistic.'
    ),
});
export type GenerateMandalaInput = z.infer<typeof GenerateMandalaInputSchema>;

const GenerateMandalaOutputSchema = z.object({
  mandalaImage: z
    .string()
    .describe(
      'The generated mandala image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type GenerateMandalaOutput = z.infer<typeof GenerateMandalaOutputSchema>;

export async function generateMandala(input: GenerateMandalaInput): Promise<GenerateMandalaOutput> {
  return generateMandalaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMandalaPrompt',
  input: {schema: GenerateMandalaInputSchema},
  output: {schema: GenerateMandalaOutputSchema},
  prompt: `You are a digital mandala artist. You will generate a mandala image based on the provided theme, symbols, colors, and style.

  Theme: {{{theme}}}
  Symbols: {{{symbols}}}
  Colors: {{{colors}}}
  Style: {{{style}}}
  
  Output the generated mandala image as a data URI.
  
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateMandalaFlow = ai.defineFlow(
  {
    name: 'generateMandalaFlow',
    inputSchema: GenerateMandalaInputSchema,
    outputSchema: GenerateMandalaOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a mandala image with the following characteristics:\n\n      Theme: ${input.theme}\n      Symbols: ${input.symbols}\n      Colors: ${input.colors}\n      Style: ${input.style}`,
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ],
      },
    });

    if (!media) {
      throw new Error('No media returned from image generation.');
    }

    return {
      mandalaImage: media.url,
    };
  }
);
