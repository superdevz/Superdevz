<template>
    <div class="app-section-head">
        <h2 class="app-heading">{{ heading }}</h2>
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
        <button class="app-add-button button" v-tooltip.top-center="createMsg" @click="showFormEvent" :class="[showForm ? activeClass : '']">
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
                sort: 'asc',
                activeClass: 'active'
            }
        },
        props: ['heading', 'createMsg', 'sortMsg', 'showForm'],
        methods: {
            changeFilter: function () {
                this.sort = this.sort == 'desc' ? 'asc' : 'desc';
            },
            showFormEvent: function () {
                this.$emit('pagesButton', !this.showForm);
            }
        },
        computed: {
            transparentAsc: function() {
                return this.sort != 'asc' ? 'opa05' : '';
            },
            transparentDesc: function() {
                return this.sort == 'asc' ? 'opa05' : '';
            }
        }
    }
</script>
