<template>
    <div class="app-page">
        <div class="app-page-container">
            <div v-bar>
                <div class="app-page-contents syncscroll" id="page-preview" name="syncscroll">
                    <error v-if="error"></error>
                    <app-page-content v-else-if="hasPage" :page="page"></app-page-content>
                    <empty v-else icon="page" name="Page" class="h100"></empty>
                </div>
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
    //         pageFormVisiblity() {
    //             return this.$store.state.pageFormVisiblity;
    //         },
    //         mdData: function () {
    //             return this.pageData == '' ? this.emptyText : md.render(this.pageData);
    //         },
            error () {
                return this.$store.state.error.page;                
            },
            hasPage () {
                return this.$store.state.selectedCard.pages.id == undefined ? false : true;                
            },
            page () {
                return this.$store.state.selectedCard.pages.data;                
            }
        }
    }
</script>
