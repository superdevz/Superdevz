<template>
    <div class="app-container">
        <!-- <page-form @getData="MoveData($event)"></page-form> -->
        <!-- <app-page @hideOthers="sectionsVisiblity($event)"></app-page> -->
        <app-page></app-page>
        <app-pages></app-pages>
        <app-categories></app-categories>
        <!-- :tabindex="[ pageFormVisiblity ? '-1' : '' ]" to make element none tabable -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // pageData: ''
            }
        // },
        // props: [ 'loading' ],
        // methods: {
        //     sectionsVisiblity: function (e) {
        //         this.sectionsView = e;
        //     },
        //     MoveData: function (e) {
        //         this.pageData = e;
        //     }
        }
    }
</script>
