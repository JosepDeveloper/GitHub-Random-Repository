import type { Language, ResponseAPIGithub } from "@/types";

const API_LANGUAGES =
	"https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

const API_GITHUB_REPOSITORIES =
	"https://api.github.com/search/repositories?q=language:";

const helper = (language: string) => {
	return API_GITHUB_REPOSITORIES + language;
};

function query(url: string) {
	return fetch(url).then((response) => response.json());
}

export function getLanguages() {
	return query(API_LANGUAGES) as Promise<Language[]>;
}

export function getRandomRepository(language: string) {
	if (language === "") {
		const languages = localStorage.getItem("languages");

		if (languages) {
			const storedLanguages = JSON.parse(languages) as Language[];

			const randomIndex = Math.floor(Math.random() * storedLanguages.length);

			// biome-ignore lint/style/noParameterAssign: <explanation>
			language = storedLanguages[randomIndex].value;
		}
	}

	const url = helper(language);

	return query(url).then((data: ResponseAPIGithub) => {
		const { items: repositories } = data;

		const randomIndex = Math.floor(Math.random() * repositories.length);

		const repositoryData = repositories[randomIndex];
		return {
			id: repositoryData.id,
			name: repositoryData.name,
			fullName: repositoryData.full_name,
			description: repositoryData.description,
			language: repositoryData.language,
			stars: repositoryData.stargazers_count,
			forksCount: repositoryData.forks_count,
			openIssues: repositoryData.open_issues_count,
		};
	});
}
