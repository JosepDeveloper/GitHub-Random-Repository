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

getLanguages()
	.then((response) => {
		state.languages.splice(0, state.languages.length, ...response);
	})
	.catch(() => {
		state.error = true;
		emitError("error");
	});
</script>

<template>
  <form>
    <Select :options="state.languages" optionLabel="title" :placeholder="getMessage" class="w-[210px]" :disabled="state.languages.length === 0" />
  </form>
</template>