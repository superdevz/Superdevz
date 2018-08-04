<template>
    <div class="app-container h100">
        <app-page-form></app-page-form>
        <router-view name="page"></router-view>
        <router-view name="pages"></router-view>
        <router-view name="categories"></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
