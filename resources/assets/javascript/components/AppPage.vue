<template>
    <div class="app-page">
        <div class="app-page-container">
            <div class="app-page-contents">
                <error v-if="error"></error>
                <app-page-content v-else-if="hasPage" :page="page"></app-page-content>
                <empty v-else icon="page" name="Page" class="h100"></empty>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            error () {
                return this.$store.state.error.page;                
            },
            hasPage () {
                return this.$store.state.selectedCard.pages.id == undefined ? false : true;                
            },
            page () {
                return this.$store.getters.getPage(this.$store.state.selectedCard.pages.id);
            },
        }
    }
</script>
