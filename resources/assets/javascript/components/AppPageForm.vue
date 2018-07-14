<template>
    <div class="app-page-form" v-bind:class="[pageFormVisibility == true ? showThisSectionClass : '']">
        <textarea class="textarea page-textarea syncscroll" id="page-textarea" name="syncscroll" v-model="pageFormTextarea" placeholder="Type In, Here"></textarea>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showThisSectionClass: 'slide-show'
            }
        },
        computed: {
            pageFormVisibility() {
                return this.$store.state.pageFormVisibility;
            },
            pageFormTextarea: {
                get () {
                    return this.$store.state.pageFormTextarea;
                },
                set (value) {
                    this.$store.dispatch('setPageFormTextarea', value)
                }
            },
        }
    }
</script>
