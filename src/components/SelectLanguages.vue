<script setup lang="ts">
import { getLanguages } from "@/lib/query";
import type { Language } from "@/types";
import Select from "primevue/select";
import { computed, reactive } from "vue";

const state = reactive({
	languages: [] as Language[],
	error: false,
});

const emitError = defineEmits(["error"]);

const getMessage = computed(() => {
	if (state.error) {
		return "Error";
	}

	if (state.languages.length === 0) {
		return "Loading";
	}
	return "Select a language";
});

const getAllLanguages = async () => {
	if (localStorage.getItem("languages") == null) {
		try {
			const languages = await getLanguages();
			localStorage.setItem("languages", JSON.stringify(languages));
			state.languages = languages;
		} catch {
			state.error = true;
			emitError("error");
		}

		return;
	}

	const storedLanguages = localStorage.getItem("languages");
	state.languages = storedLanguages ? JSON.parse(storedLanguages) : [];
};

getAllLanguages();
</script>

<template>
  <form>
    <Select :options="state.languages" optionLabel="title" :placeholder="getMessage" class="w-[210px]" :disabled="state.languages.length === 0" />
  </form>
</template>