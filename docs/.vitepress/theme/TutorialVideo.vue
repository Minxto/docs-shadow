<template>
  <div class="gb-video">
    <video controls playsinline preload="metadata" :src="videoSrc">
      {{ fallbackText }}
    </video>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  fallbackText?: string
}>(), {
  fallbackText: 'Your browser does not support video playback.'
})

// Dynamic path so Vite does not try to bundle the public video at build time.
const videoSrc = `/videos/${'easy-bypass.mp4'}`
</script>
