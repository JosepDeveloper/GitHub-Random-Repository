<script setup lang="ts">
const { error = "An error has occurred" } = defineProps<{
  error?: string;
}>();

defineEmits(['reload'])
</script>

<template>
  <article class="flex flex-col items-center justify-center gap-1">
    <h2 class="text-3xl font-semibold text-center text-[#DC2626]">{{ error }}</h2>
    <button
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-red-700 hover:bg-red-800 cursor-pointer transition-colors ease-in-out"
      @click="$emit('reload')">
      Try Again
    </button>
  </article>
</template>