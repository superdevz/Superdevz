<template>
    <div class="app-categories" v-bind:class="[pageFormVisiblity == true ? hideClass : '']">
        <categories-options
            :showAddForm="showAddForm"
            @showAddFormEvent="addFormStatus($event)"
        />
        <transition name="form-fade">
            <div v-if="showAddForm" class="category-form">
                <form @submit.prevent="addCategoryHandler">
                    <div class="input-group">
                        <swatches v-model="addColor" :colors='colors' v-tooltip.top-center="colorMsg" />
                        <input type="text" class="input category-input" id="addCategory" v-model="addCategory" placeholder="Category name">
                        <button type="submit" class="button" :class="[addButtonLoading ? loadingClass : '']" :disabled="addButtonLoading">Add</button>
                    </div>
                </form>
            </div>
            <div v-if="showEditForm" class="category-form">
                <form @submit.prevent="editCategoryHandler">
                    <div class="input-group">
                        <swatches v-model="color" :colors='colors' v-tooltip.top-center="colorMsg" />
                        <input type="text" class="input category-input" id="editCategory" v-model="editCategory" placeholder="Category name">
                        <button type="submit" class="button" :class="[buttonLoading ? loadingClass : '']" :disabled="buttonLoading">Add</button>
                    </div>
                </form>
            </div>
        </transition>
        <div v-bar>
            <div class="app-cards" :class="[showAddForm ? lessHeightClass : '']">
                <error v-if="error"></error>
                <div v-else-if="loading" class="loader-bg h100"></div>
                <div class="app-cards-container" v-else-if="categories.length > 0">
                    <transition-group name="list" tag="div">
                        <card
                            v-for="category in categories"
                            :key="category.id"
                            :card-title="category.self"
                            :color="category.color"
                            @click.native="selectedCard = category"
                            @click.right.native="selectedCard = category"
                            v-bind:class="[selectedCard == category ? selectClass : '']"
                            @contextmenu.prevent.native="$refs.categoryMenu.open"
                        />
                    </transition-group>
                </div>
                <empty v-else icon="boxes" name="Categories" class="h100"></empty>
            </div>
        </div>
        <context-menu id="context-menu" ref="categoryMenu">
            <li><a href="#" @click="editCategory">Edit</a></li>
            <li><a href="#" class="danger" @click="removeCategory">Delete</a></li>
        </context-menu>
    </div>
</template>

<script>
    import Error from './errors';
    import contextMenu from 'vue-context-menu';
    import Swatches from 'vue-swatches';

    export default {
        data() {
            return {
                selectedCard: undefined,
                selectClass: 'selected',
                lessHeightClass: 'less-height',
                loadingClass: 'button-loader',
                addCategory: '',
                addButtonLoading: false,
                addColor: '#0072d9',
                oneTime: false,
                colors: [
                    '#0072d9','#000000','#ffc0cb','#008080','#ffe4e1','#ff0000','#ffd700','#00ffff','#40e0d0','#ff7373','#d3ffce','#e6e6fa','#0000ff','#ffa500','#f0f8ff','#b0e0e6','#7fffd4','#cccccc','#800080','#eeeeee','#c6e2ff','#faebd7','#fa8072','#333333','#ffb6c1','#00ff00','#c0c0c0','#003366','#ffff00','#f08080','#800000','#20b2aa','#ffc3a0','#f6546a','#fff68f','#468499','#ff6666','#666666','#66cdaa','#c39797','#00ced1','#ff00ff','#008000','#088da5','#ffdab9','#c0d6e4','#f5f5f5','#8b0000','#660066','#808080','#ff7f50','#0e2f44','#afeeee','#dddddd','#990000','#cbbeb5','#daa520','#b4eeb4','#ffff66','#00ff7f','#8a2be2','#81d8d0','#3399ff','#ff4040','#66cccc','#cc0000','#a0db8e','#f5f5dc','#ccff00','#000080','#794044','#b6fcd5','#3b5998','#999999','#191970','#6897bb','#ff4444','#31698a','#0099cc','#f7f7f7','#fef65b','#191919','#ff1493','#6dc066'
                ],
                colorMsg: 'Pick a color',
                showAddForm: false,
                showEditForm: false,
                hideClass: 'slide-hide'
            }
        },
        computed: {
            categories () {
                return this.$store.getters.sortedCategories;
            },
            loading () {
                return this.$store.state.categoryLoading;
            },
            error () {
                return this.$store.state.categoryError;
            },
            pageFormVisiblity() {
                return this.$store.state.pageFormVisiblity;
            }
        },
        components: { contextMenu, Swatches },
        methods: {
            editCategory() {

            },
            removeCategory: function () {
                this.$delete(this.nums, this.selectedCard)
            },
            addFormStatus: function (e) {
                this.showAddForm = e;
            },
            addCategoryHandler() {
                if(this.addCategory.length == 0) {
                    if (this.oneTime == false) {
                        flash('Category name field is required.', 3000);
                        this.oneTime = true;
                    }
                    document.getElementById('addCategory').focus();
                } else {
                    this.addButtonLoading = true;
                    axios.post(route('category.store'), {
                        name: this.addCategory,
                        color: this.addColor
                    }, api_headers())
                    .then(data => {
                        this.addButtonLoading = false;
                        this.addCategory = '';
                        this.addColor = '#0072d9';
                        this.$store.dispatch('fetchCategories');
                    })
                    .catch(error => {
                        this.addButtonLoading = false;
                    });
                }
            },
            editCategoryHandler() {

            }
        }
    }
</script>
