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

// About 220 words a minute. Fenced code is skipped: it is skimmed, not read.
export function readingTime(markdown: string): number {
	const words = markdown.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}

// Where a Post sits within its Series (oldest first), and its neighbours.
export function getSeriesPosition(post: Post, posts: Post[]) {
	const name = post.data.series;
	if (!name) return undefined;
	const inSeries = posts
		.filter((p) => p.data.series === name)
		.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id));
	const index = inSeries.findIndex((p) => p.id === post.id);
	return {
		name,
		position: index + 1,
		total: inSeries.length,
		previous: inSeries[index - 1],
		next: inSeries[index + 1],
	};
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
