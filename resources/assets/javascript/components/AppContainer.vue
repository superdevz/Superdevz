<template>
    <div>
        <main-view></main-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        beforeRouteUpdate (to, from, next) {
            if (to.name == 'home') {
                if(to.params.page != undefined && to.params.category != undefined) {
                    this.$store.dispatch('setSelectedCategory', this.$store.getters.getCategory(parseInt(to.params.category)));
                    this.$store.dispatch('setSelectedPage', this.$store.getters.getPage(parseInt(to.params.page)));
                } else if(to.params.category != undefined) {
                    this.$store.dispatch('setSelectedCategory', this.$store.getters.getCategory(parseInt(to.params.category)));
                }
            }
            next();
        }
    }
</script>
