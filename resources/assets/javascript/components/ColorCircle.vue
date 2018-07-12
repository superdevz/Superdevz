<template>
    <div :class="innerClass" :style="{ backgroundColor: color }"></div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        props: ['color', 'innerClass']
    }
</script>
