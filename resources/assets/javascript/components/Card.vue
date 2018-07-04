<template>
    <div class="app-card">
        <div class="app-card-drag" v-tooltip.left="dragMsg">
            <i class="fas fa-ellipsis-v"></i>
        </div>
        <h3 class="app-card-heading">{{ cardTitle }}</h3>
        <div v-if="color">
            <color-circle :color="color"></color-circle>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dragMsg: 'Drag to order'
            }
        },
        props: ['cardTitle', 'color'],
    }
</script>
