<script setup lang="ts">
import Emty from "@/components/Emty.vue";
import SelectLanguages from "@/components/SelectLanguages.vue";
import Github from "@/components/icons/GitHub.vue";
import { reactive } from "vue";

const STATE = {
	EMPTY: 0,
	LOADING: 1,
	SUCCESS: 2,
	ERROR: 3,
} as const;

type State = (typeof STATE)[keyof typeof STATE];

const state = reactive({
	appState: STATE.EMPTY as State,
});
</script>

<template>
  <div>
    <header>
      <h1 class="font-bold text-5xl text-center">Github Random Repository</h1>
      <p class="text-sm font-medium text-white/60 text-center">Search and view random repositories from Github</p>
    </header>

    <main class="mt-14">
      <div class="flex flex-col gap-4">
        <SelectLanguages @error="() => { state.appState = STATE.ERROR }" />

        <div v-if="state.appState === STATE.EMPTY">
          <Emty />
        </div>
        <div v-else-if="state.appState === STATE.LOADING">
          LOADING
        </div>
        <div v-else-if="state.appState === STATE.SUCCESS">
          SUCCESS
        </div>
        <div v-else-if="state.appState === STATE.ERROR">
          ERROR
        </div>
        <div v-else>
          I have no idea how you got here. 🤨
        </div>
      </div>
    </main>

    <footer class="self-end flex justify-center">
      <a href="https://github.com/JosepDeveloper" target="_blank" rel="noopener" class="text-center font-medium text-white/60 inline-flex items-center gap-1">
        Develoment with ❤️ by JosepDeveloper <Github />
      </a>
    </footer>
  </div>
</template>

<style scoped>
  div {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    justify-content: center;
  }
</style>