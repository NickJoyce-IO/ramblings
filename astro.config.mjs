// @ts-check
import { defineConfig } from 'astro/config';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	site: 'https://ramblings.nickjoyce.io',
	markdown: {
		// The unified (remark/rehype) pipeline, so the rehype plugin below works.
		// Astro 7's default processor is Satteri, which has a different plugin API.
		processor: unified({
			rehypePlugins: [
				// Autolink needs heading ids to exist first.
				rehypeHeadingIds,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: { className: ['heading-anchor'], ariaLabel: 'Link to this section' },
						content: {
							type: 'element',
							tagName: 'span',
							properties: { ariaHidden: 'true' },
							children: [{ type: 'text', value: '#' }],
						},
					},
				],
			],
		}),
		shikiConfig: {
			// Emit both themes as CSS variables; global.css picks one per colour scheme.
			themes: { light: 'github-light', dark: 'github-dark' },
			defaultColor: false,
		},
	},
});
