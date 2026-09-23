import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A Post is exactly one of these kinds (see CONTEXT.md).
export const postKinds = ['essay', 'build-log', 'note'] as const;

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		kind: z.enum(postKinds),
		date: z.coerce.date(),
		// Optional name of the Series this Post belongs to.
		series: z.string().optional(),
		// Drafts are never published.
		draft: z.boolean().default(false),
	}),
});

export const collections = { posts };
