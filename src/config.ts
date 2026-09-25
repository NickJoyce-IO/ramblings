// Links shown on the home page. An empty string hides that link, so a
// placeholder can never go live as a dead link: fill one in to show it.
export const links = {
	github: 'https://github.com/NickJoyce-IO',
	linkedin: 'https://www.linkedin.com/in/nick-joyce-6906b22b',
	email: 'nickjoyceio7@gmail.com',
};

export const linkLabels: Record<keyof typeof links, string> = {
	github: 'GitHub',
	linkedin: 'LinkedIn',
	email: 'Email',
};

// The href for a link, or undefined when it is not filled in.
export function linkHref(name: keyof typeof links): string | undefined {
	const value = links[name].trim();
	if (!value) return undefined;
	return name === 'email' ? `mailto:${value}` : value;
}
