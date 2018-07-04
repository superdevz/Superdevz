<template>
    <div class="app-card">
        <h3 class="app-card-heading">{{ cardTitle }}</h3>
        <div>
            <color-circle :color="color"></color-circle>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ['cardTitle', 'color'],
    }
</script>
