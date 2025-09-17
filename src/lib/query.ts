import type { Language } from "@/types";

const API_LANGUAGES =
	"https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

function query(url: string) {
	return fetch(url).then((response) => response.json());
}

export function getLanguages() {
	return query(API_LANGUAGES) as Promise<Language[]>;
}
