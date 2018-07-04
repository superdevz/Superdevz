<template>
    <div class="app-section-head">
        <h2 class="app-heading">Categories</h2>
        <button type="button" class="app-filter-button button" @click="changeFilter" v-tooltip.top-center="sortMsg">
            <span class="fa-layers fa-fw">
                <span :class="transparentAsc">
                    <i class="fas fa-sort-up"></i>
                </span>
                <span :class="transparentDesc">
                    <i class="fas fa-sort-down"></i>
                </span>
            </span>
        </button>
        <button class="app-add-button button" v-tooltip.top-center="createMsg" @click="showAddFormHandler" :class="[showAddForm ? activeClass : '']">
            <span class="fa-layers fa-fw">
                <i class="far fa-plus-square"></i>
            </span>
        </button>
        <button class="app-add-button button" v-if="showEditForm" v-tooltip.top-center="exitMsg" @click="hideEditForm">
            <span class="fa-layers fa-fw">
                <i class="far fa-plus-square"></i>
            </span>
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeClass: 'active',
                sortMsg: 'Sort categories',
                createMsg: 'Create a category',
                exitMsg: 'Exit edit mode'
            }
        },
        props: ['showAddForm'],
        methods: {
            changeFilter: function () {
                let sort = this.$store.state.sort.categories == 'desc' ? 'asc' : 'desc';
                this.$store.dispatch('setCategoriesSort', sort);
            },
            showAddFormHandler: function () {
                this.$emit('showAddFormEvent', !this.showAddForm);
            }
        },
        computed: {
            transparentAsc: function() {
                return this.$store.state.sort.categories == 'asc' ? 'opa05' : '';
            },
            transparentDesc: function() {
                return this.$store.state.sort.categories == 'desc' ? 'opa05' : '';
            },
            showEditForm() {
                return this.$store.state.formVisibility.categories.edit;
            }
        }
    }
</script>
