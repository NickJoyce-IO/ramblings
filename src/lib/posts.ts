import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const kindLabels = {
	essay: 'Essay',
	'build-log': 'Build Log',
	note: 'Note',
} as const;

// Newest first. Drafts show up while developing locally (npm run dev) and
// are never included in a production build.
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// "Building Ramblings" -> "building-ramblings"
export function seriesSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

// Dates in frontmatter are UTC midnight, so format in UTC to avoid off-by-one days.
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	});
}
