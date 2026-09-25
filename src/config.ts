// Links shown on the home page. An empty string hides that link, so a
// placeholder can never go live as a dead link: fill one in to show it.
export const links = {
	github: 'https://github.com/NickJoyce-IO',
	linkedin: '',
	email: '', // an address, not a mailto: link
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
