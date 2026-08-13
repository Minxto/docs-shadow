<template>
  <div class="gb-video">
    <video controls playsinline preload="metadata" src="/videos/easy-bypass.mp4">
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
</script>
