<script setup lang="ts">
import Emty from "@/components/Emty.vue";
import ErrorComponent from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import SelectLanguages from "@/components/SelectLanguages.vue";
import Github from "@/components/icons/GitHub.vue";
import { getRandomRepository } from "@/lib/query";
import { reactive, ref } from "vue";

const APP_STATE = {
  EMPTY: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
} as const;

type AppState = (typeof APP_STATE)[keyof typeof APP_STATE];

const state = reactive<{
  appState: AppState;
  errorMessage: string | undefined;
}>({
  appState: APP_STATE.EMPTY,
  errorMessage: undefined,
});

const selectLanguages = ref<
  {
    getAllLanguages: () => void
  } | null
>(null)

function getAllLanguages() {
  if (selectLanguages.value) {
    selectLanguages.value.getAllLanguages()
  }
}
</script>

<template>
  <div>
    <header>
      <h1 class="font-bold text-5xl text-center">Github Random Repository</h1>
      <p class="text-sm font-medium text-white/60 text-center">Search and view random repositories from Github</p>
    </header>

    <main class="mt-14">
      <div class="flex flex-col gap-4">
        <SelectLanguages ref="selectLanguages"
          @error="(message) => { state.appState = APP_STATE.ERROR; state.errorMessage = message }" @change-language="(language) => {
            state.appState = APP_STATE.LOADING

            getRandomRepository(language).then((data) => {
              state.appState = APP_STATE.SUCCESS
            }).catch(() => {
              state.appState = APP_STATE.ERROR
              state.errorMessage = 'Failed to get repository data'
            })
          }" />

        <div v-if="state.appState === APP_STATE.EMPTY">
          <Emty />
        </div>
        <div v-else-if="state.appState === APP_STATE.LOADING">
          <Loading />
        </div>
        <div v-else-if="state.appState === APP_STATE.SUCCESS">
          SUCCESS
        </div>
        <div v-else-if="state.appState === APP_STATE.ERROR">
          <ErrorComponent :error="state.errorMessage" @reload="() => {
            state.appState = APP_STATE.EMPTY
            getAllLanguages()
          }" />
        </div>
        <div v-else>
          I have no idea how you got here. 🤨
        </div>
      </div>
    </main>

    <footer class="self-end flex justify-center">
      <a href="https://github.com/JosepDeveloper" target="_blank" rel="noopener"
        class="text-center font-medium text-white/60 inline-flex items-center gap-1">
        Develoment with ❤️ by JosepDeveloper
        <Github />
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