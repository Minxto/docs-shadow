<template>
  <div class="gb-video">
    <div class="gb-video-embed">
      <iframe
        :src="streamableEmbedUrl"
        title="Shadow Emulator tutorial"
        allow="fullscreen; encrypted-media"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const streamableEmbedUrl = 'https://streamable.com/e/c3779m'
</script>
