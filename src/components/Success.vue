<script setup lang="ts">
import External from '@/components/icons/External.vue';
import Fork from '@/components/icons/Fork.vue';
import Info from '@/components/icons/Info.vue';
import Star from '@/components/icons/Star.vue';
import Button from 'primevue/button';

const { repositoryData } = defineProps<{
  repositoryData: {
    id: number;
    name: string;
    fullName: string;
    description: string;
    language: string;
    stars: number;
    forksCount: number;
    openIssues: number;
  }
}>()

const {
  name,
  fullName,
  description,
  language,
  stars,
  forksCount,
  openIssues,
} = repositoryData

function abbreviateNumber(number: number) {
  if (number >= 1e9) {
    // biome-ignore lint/style/useTemplate: <explanation>
    return (number / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1e6) {
    // biome-ignore lint/style/useTemplate: <explanation>
    return (number / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1e3) {
    // biome-ignore lint/style/useTemplate: <explanation>
    return (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
}

const languageStyles = {
  javascript: 'bg-yellow-400',
  python: 'bg-blue-500',
  java: 'bg-orange-600',
  c: 'bg-blue-800',
  cpp: 'bg-blue-900',
  csharp: 'bg-purple-600',
  ruby: 'bg-red-500',
  php: 'bg-indigo-600',
  go: 'bg-cyan-500',
  rust: 'bg-orange-400',
  swift: 'bg-orange-500',
  kotlin: 'bg-blue-700',
  typescript: 'bg-blue-600',
  html: 'bg-orange-700',
  css: 'bg-blue-500',
  sql: 'bg-purple-800',
  default: 'bg-gray-500'
} as const;

type LanguageKey = keyof typeof languageStyles;

function getLanguageBGColor(language: string) {
  const key = language.toLowerCase() as LanguageKey;
  return `${languageStyles[key] ?? languageStyles.default}`;
}

defineEmits(['refresh'])
</script>

<template>
  <a class="md:w-[500px] w-[80%] p-3 h-fit outline-1 outline-white/30 rounded-lg flex flex-col gap-4"
    :href="`https://github.com/${fullName}`" target="_blank" rel="noopener noreferrer">
    <header class="flex justify-between">
      <div>
        <h1 class="font-bold text-xl">{{ name }}</h1>
        <small class="text-xs text-white/60 font-semibold">{{ fullName }}</small>
      </div>

      <External class="text-white/60" />
    </header>

    <p class="font">{{ description }}</p>

    <footer>
      <ul class="flex gap-2 flex-wrap">
        <li class="inline-flex gap-1 items-center justify-center">
          <div :class="`size-2 rounded-full ${getLanguageBGColor(language)}`" /> {{ language }}
        </li>
        <li class="inline-flex gap-1 items-center justify-center">
          <Star class="size-4" /> {{ abbreviateNumber(stars) }}
        </li>
        <li class="inline-flex gap-1 items-center justify-center">
          <Fork class="size-4" /> {{ abbreviateNumber(forksCount) }}
        </li>
        <li class="inline-flex gap-1 items-center justify-center">
          <Info class="size-4" /> {{ abbreviateNumber(openIssues) }}
        </li>
      </ul>
    </footer>
  </a>

  <Button label="Refresh" severity="secondary" @click="$emit('refresh')" />
</template>
