<template>
    <transition name="message-fade">
        <span v-text="text" v-if="visible" class="error-text"></span>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ['text', 'visible'],
    }
</script>
