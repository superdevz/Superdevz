<template>
    <div class="app-categories" v-bind:class="[pageFormVisibility == true ? hideThisSectionClass : '']">
        <categories-options @Addfocus="handleAddfocus" />
        <transition name="form-fade">
            <div v-if="addFormVisiblity" class="category-form">
                <form @submit.prevent="handleAddCategory">
                    <div class="input-group">
                        <swatches v-model="add.color" :colors='colors' v-tooltip.top-center="colorMsg" />
                        <input type="text" class="input category-input" id="addCategory" v-model="add.name" placeholder="Category name">
                        <button type="submit" class="button" :class="[add.buttonLoading ? loadingClass : '']" :disabled="add.buttonLoading">Add</button>
                    </div>
                </form>
            </div>
            <div v-if="editFormVisiblity" class="category-form">
                <form @submit.prevent="handleEditCategory">
                    <div class="input-group">
                        <swatches v-model="edit.color" :colors='colors' v-tooltip.top-center="colorMsg" />
                        <input type="text" class="input category-input" id="editCategory" v-model="edit.name" placeholder="Category name">
                        <button type="submit" class="button" :class="[edit.buttonLoading ? loadingClass : '']" :disabled="edit.buttonLoading">Edit</button>
                    </div>
                </form>
            </div>
        </transition>
        <div v-bar>
            <div class="app-cards" :class="[addFormVisiblity ? lessHeightClass : '', editFormVisiblity ? lessHeightClass : '']">
                <error v-if="error"></error>
                <div v-else-if="loading" class="loader-bg h100"></div>
                <div class="app-cards-container" v-else-if="categories.length > 0">
                    <draggable
                        v-model="categories"
                        :options="{ group: 'categories', animation: 100, handle: '.drag-handle' }"
                        @change="handelCategoriesSorting"
                    >
                        <transition-group name="list" tag="div">
                            <card
                                v-for="category in categories"
                                :key="category.id"
                                :card-title="category.self"
                                :color="category.color"
                                :single="category"
                                cardType="category"
                                v-bind:class="[selectedCardId == category.id ? selectedCardClass : '']"
                                @click.right.native="handleSelectCard(category)"
                                @contextmenu.prevent.native="$refs.categoryMenu.open"
                            />
                        </transition-group>
                    </draggable>
                </div>
                <empty v-else icon="boxes" name="Categories" class="h100"></empty>
            </div>
        </div>
        <context-menu id="context-menu" ref="categoryMenu" class="app-context-menu">
            <li>
                <a href="#" class="normal" @click.prevent="handleAddPage">
                    <i class="far fa-plus-square"></i> Add page
                </a>
                </li>
            <li>
                <a href="#" class="normal" @click.prevent="handleActiveEditMode">
                    <i class="fas fa-pen-square"></i> Edit
                </a>
                </li>
            <li>
                <a href="#" class="danger" @click.prevent="handleRemoveCategory">
                    <i class="far fa-trash-alt"></i> Delete
                </a>
            </li>
        </context-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    import draggable from 'vuedraggable';
    import Swatches from 'vue-swatches';
    import contextMenu from 'vue-context-menu';

    export default {
        data() {
            return {
                add: {
                    name: '',
                    color: '',
                    oneTime: false,
                    buttonLoading: false
                },
                edit: {
                    name: '',
                    color: '',
                    id: null,
                    oneTime: false,
                    buttonLoading: false
                },
                colors: [
                    '', '#0072d9','#000000','#ffc0cb','#008080','#ffe4e1','#ff0000','#ffd700','#00ffff','#40e0d0','#ff7373','#d3ffce','#e6e6fa','#0000ff','#ffa500','#f0f8ff','#b0e0e6','#7fffd4','#cccccc','#800080','#eeeeee','#c6e2ff','#faebd7','#fa8072','#333333','#ffb6c1','#00ff00','#c0c0c0','#003366','#ffff00','#f08080','#800000','#20b2aa','#ffc3a0','#f6546a','#fff68f','#468499','#ff6666','#666666','#66cdaa','#c39797','#00ced1','#ff00ff','#008000','#088da5','#ffdab9','#c0d6e4','#f5f5f5','#8b0000','#660066','#808080','#ff7f50','#0e2f44','#afeeee','#dddddd','#990000','#cbbeb5','#daa520','#b4eeb4','#ffff66','#00ff7f','#8a2be2','#81d8d0','#3399ff','#ff4040','#66cccc','#cc0000','#a0db8e','#f5f5dc','#ccff00','#000080','#794044','#b6fcd5','#3b5998','#999999','#191970','#6897bb','#ff4444','#31698a','#0099cc','#f7f7f7','#fef65b','#191919','#ff1493','#6dc066'
                ],
                colorMsg: 'Pick a color',
                loadingClass: 'button-loader',
                lessHeightClass: 'less-height',
                selectedCardClass: 'selected',
                hideThisSectionClass: 'slide-hide'
            }
        },
        computed: {
            addFormVisiblity () {
                return this.$store.state.formVisiblity.categories.add;
            },
            editFormVisiblity () {
                return this.$store.state.formVisiblity.categories.edit;
            },
            selectedCardId () {
                return this.$store.state.selectedCard.categories.id;
            },
            selectedCardName () {
                return this.$store.state.selectedCard.categories.data.name;
            },
            selectedCardColor () {
                return this.$store.state.selectedCard.categories.data.color;
            },
            error () {
                return this.$store.state.error.categories;
            },
            loading () {
                return this.$store.state.loading.categories;
            },
            categories: {
                get() {
                    return this.$store.getters.sortedCategories;
                },
                set(value) {
                    this.$store.dispatch('orderCategories', value);
                }
            },
            pageFormVisibility () {
                return this.$store.state.pageFormVisibility;
            }
        },
        components: { contextMenu, Swatches, draggable },
        methods: {
            handleAddCategory() {
                if(this.add.name.length == 0) {
                    if (this.add.oneTime == false) {
                        flash('Category name field is required.', 3000);
                        this.add.oneTime = true;
                    }
                    document.getElementById('addCategory').focus();
                } else {
                    this.add.buttonLoading = true;
                    let self = this;
                    axios.post(route('category.store'), {
                        name: this.add.name,
                        color: this.add.color
                    })
                    .then(data => {
                        self.add.buttonLoading = false;
                        self.add.name = '';
                        self.add.color = '';
                        self.$store.dispatch('addCategory', {
                            category: data.data.data,
                            sort: this.$store.state.sort.categories
                        });
                    })
                    .catch(error => {
                        self.add.buttonLoading = false;
                    });
                }
            },
            handleEditCategory() {
                if(this.edit.name.length == 0) {
                    if (this.edit.oneTime == false) {
                        flash('Category name field is required.', 3000);
                        this.edit.oneTime = true;
                    }
                    document.getElementById('editCategory').focus();
                } else {
                    this.edit.buttonLoading = true;
                    let self = this;
                    axios.patch(route('category.update', { category: this.edit.id }), {
                        name: this.edit.name,
                        color: this.edit.color
                    })
                    .then(data => {
                        self.edit.buttonLoading = false;
                        self.$store.dispatch('setCategoryEditMode', false);
                        self.$store.dispatch('editCategory', {
                            id: self.edit.id,
                            category: data.data.data
                        });
                        self.edit.name = '';
                        self.edit.color = '';
                        self.edit.id = null;
                    })
                    .catch(error => {
                        self.edit.buttonLoading = false;
                    });
                }
            },
            handleSelectCard (category) {
                this.$store.dispatch('setPageEditMode', false);
                this.$store.dispatch('setSelectedCategory', category);
            },
            handleActiveEditMode () {
                this.edit.name = this.selectedCardName;
                this.edit.color = this.selectedCardColor;
                this.edit.id = this.selectedCardId;
                this.$store.dispatch('setCategoryEditMode', true);
                setTimeout(() => {
                    document.getElementById('editCategory').focus();
                }, 100);
            },
            handleRemoveCategory () {
                let self = this;
                let confirmBox = confirm("Are you sure you want to delete this category '" + this.selectedCardName +"'?");
                if (confirmBox == true) {
                    this.$store.dispatch('setCategoryEditMode', false);
                    axios.delete(route('category.destroy', { category: this.selectedCardId }))
                    .then(data => {
                        self.$store.dispatch('deleteCategory', this.selectedCardId);
                    });
                }
            },
            handelCategoriesSorting () {
                this.$store.dispatch('syncCategories', {
                    categories: this.categories,
                    sort: this.$store.state.sort.categories
                });
            },
            handleAddPage () {
                this.$store.dispatch('setPageAddMode', true);
            },
            handleAddfocus () {
                setTimeout(() => {
                    document.getElementById('addCategory').focus();
                }, 100);
            }
        }
    }
</script>
