<template>
    <div class="app-section-head">
        <h2 class="app-heading">Categories</h2>
        <v-popover offset="3">
            <button type="button" class="app-info-button app-info-page button" v-tooltip.top-center="infoMsg">
                <span class="fa-layers fa-fw">
                    <i class="fas fa-info"></i>
                </span>
            </button>
            <template slot="popover">
                <p class="popover-text">
                    <ul class="clean-list">
                        <li>{{ helpText }}</li>
                        <li>{{ helpText2 }}</li>
                        <li>{{ helpText3 }}</li>
                    </ul>
                </p>
            </template>
        </v-popover>
        <button type="button" class="app-filter-button button" @click="handleSortChange" v-tooltip.top-center="sortMsg">
            <span class="fa-layers fa-fw">
                <span :class="transparentAsc">
                    <i class="fas fa-sort-up"></i>
                </span>
                <span :class="transparentDesc">
                    <i class="fas fa-sort-down"></i>
                </span>
            </span>
        </button>
        <button class="app-add-button button" v-if="!editFormVisiblity" v-tooltip.top-center="createMsg" @click="handelShowAddForm" :class="[addFormVisiblity ? activeClass : '']">
            <span class="fa-layers fa-fw">
                <i class="fas fa-plus"></i>
            </span>
        </button>
        <button class="app-exit-button button danger" v-if="editFormVisiblity" v-tooltip.top-center="exitMsg" @click="handelHideEditForm">
            <span class="fa-layers fa-fw">
                <i class="far fa-times-circle"></i>
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
                exitMsg: 'Exit edit mode',
                infoMsg: 'Pro tips',
                helpText: 'You can order categories by dragging and dropping the three dots at the left of any category.',
                helpText2: 'You can right-click any category to edit or delete it.',
                helpText3: 'You can right-click any category to add a new page.'
            }
        },
        methods: {
            handleSortChange () {
                let sort = this.$store.state.sort.categories == 'desc' ? 'asc' : 'desc';
                this.$store.dispatch('setCategoriesSort', sort);
            },
            handelShowAddForm () {
                this.$store.dispatch('setCategoriesAddFormVisibility', !this.addFormVisiblity);
                this.$emit('Addfocus');
            },
            handelHideEditForm () {
                this.$store.dispatch('setCategoriesEditFormVisibility', false);
            }
        },
        computed: {
            addFormVisiblity() {
                return this.$store.state.formVisiblity.categories.add;
            },
            editFormVisiblity() {
                return this.$store.state.formVisiblity.categories.edit;
            },
            transparentAsc: function() {
                return this.$store.state.sort.categories == 'asc' ? '' : 'opa05';
            },
            transparentDesc: function() {
                return this.$store.state.sort.categories == 'desc' ? '' : 'opa05';
            },
        }
    }
</script>
