<template>
    <div class="app-pages h100" v-bind:class="[pageFormVisibility == true ? hideThisSectionClass : '']">
        <pages-options @addFocus="handleAddfocus" />
        <transition name="form-fade">
            <div v-if="addFormVisiblity" class="page-form">
                <form autocomplete="off" @submit.prevent="handleAddPage">
                    <div class="input-group">
                        <input type="text" class="input page-input" id="addPage" v-model="add.title" placeholder="Page title" @keyup.esc="handelHideAddForm">
                        <button type="submit" class="button" :class="[add.buttonLoading ? loadingClass : '']" :disabled="add.buttonLoading">Add</button>
                    </div>
                </form>
            </div>
            <div v-if="editFormVisiblity" class="page-form">
                <form autocomplete="off" @submit.prevent="handleEditPage">
                    <div class="input-group">
                        <input type="text" class="input page-input" id="editPage" v-model="edit.title" placeholder="Page title" @keyup.esc="handelHideEditForm">
                        <button type="submit" class="button" :class="[edit.buttonLoading ? loadingClass : '']" :disabled="edit.buttonLoading">Edit</button>
                    </div>
                </form>
            </div>
        </transition>
        <div class="app-relative" :style="blockHeight">
            <div class="app-fixed">
                <div class="h100" v-bar>
                    <div class="app-cards">
                        <error v-if="error"></error>
                        <div v-else-if="loading" class="loader-bg h100"></div>
                        <div class="app-cards-container" :style="listHeight" v-else-if="pages.length > 0">
                            <draggable
                                v-model="pages"
                                :options="{ group: 'pages', animation: 100, handle: '.drag-handle' }"
                                @change="handelPagesSorting"
                            >
                                <transition-group name="list" tag="div">
                                    <card
                                        v-for="page in pages"
                                        :key="page.id"
                                        :card-title="page.title"
                                        :single="page"
                                        cardType="page"
                                        v-bind:class="[selectedCardId == page.id ? selectedCardClass : '']"
                                        @click.right.native="handleSelectCard(page)"
                                        @contextmenu.prevent.native="$refs.pageMenu.open"
                                    />
                                </transition-group>
                            </draggable>
                        </div>
                        <empty-pages v-else-if="hasPages == false" class="h100"></empty-pages>
                        <empty v-else icon="pages" name="Pages" class="app-empty-pages h100"></empty>
                    </div>
                </div>
            </div>
        </div>
        <context-menu id="context-menu" ref="pageMenu" class="app-context-menu">
            <li>
                <a href="#" class="normal" @click.prevent="handleActiveEditMode">
                    <i class="fas fa-pen-square"></i> Edit title
                </a>
            </li>
            <li>
                <a href="#" class="danger" @click.prevent="handleRemovePage">
                    <i class="far fa-trash-alt"></i> Delete
                </a>
            </li>
        </context-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    import draggable from 'vuedraggable';
    import contextMenu from 'vue-context-menu';

    export default {
        data() {
            return {
                add: {
                    title: '',
                    oneTime: false,
                    oneTimeError: false,
                    buttonLoading: false
                },
                edit: {
                    title: '',
                    id: null,
                    oneTime: false,
                    oneTimeError: false,
                    buttonLoading: false
                },
                loadingClass: 'button-loader',
                selectedCardClass: 'selected',
                hideThisSectionClass: 'slide-hide',
                blockHeight: {
                    height: ''
                },
                listHeight: {
                    height: ''
                }
            }
        },
        mounted() {
            this.setContentHeight(this.pageHeight);
        },
        computed: {
            addFormVisiblity () {
                return this.$store.state.formVisiblity.pages.add;
            },
            editFormVisiblity () {
                return this.$store.state.formVisiblity.pages.edit;
            },
            selectedCategoryId () {
                return this.$store.state.selectedCard.categories.id;
            },
            selectedCardId () {
                return this.$store.state.selectedCard.pages.id;
            },
            selectedCardTitle () {
                return this.$store.state.selectedCard.pages.data.title;
            },
            error () {
                return this.$store.state.error.pages;
            },
            loading () {
                return this.$store.state.loading.pages;
            },
            pages: {
                get() {
                    return this.$store.getters.sortedPages;
                },
                set(value) {
                    this.$store.dispatch('orderPages', value);
                }
            },
            pageFormVisibility () {
                return this.$store.state.pageFormVisibility;
            },
            hasPages() {
                return this.$store.getters.hasPages;
            },
            pageHeight () {
                return this.$store.state.pageHeight;
            }
        },
        watch: {
            pageHeight(val) {
                this.setContentHeight(val);
            },
            addFormVisiblity() {
                this.setContentHeight(this.pageHeight);
            },
            editFormVisiblity() {
                this.setContentHeight(this.pageHeight);
            }
        },
        components: { contextMenu, draggable },
        methods: {
            handleAddPage() {
                if(this.add.title.length == 0) {
                    if (this.add.oneTime == false) {
                        flash('Page title field is required.', 3000);
                        this.add.oneTime = true;
                    }
                    document.getElementById('addPage').focus();
                } else if(this.selectedCategoryId == undefined) {
                    let self = this;
                    if (this.add.oneTimeError == false) {
                        flash('Select the category that you want that page on.', 3000);
                        this.add.oneTimeError = true;
                        setTimeout(() => {
                            self.add.oneTimeError = false;
                        }, 3300);
                    }
                    document.getElementById('addPage').focus();
                } else {
                    this.add.buttonLoading = true;
                    let self = this;
                    axios.post(route('page.store', { category: this.selectedCategoryId }), {
                        title: this.add.title
                    })
                    .then(data => {
                        self.add.buttonLoading = false;
                        self.add.title = '';
                        self.$store.dispatch('addPage', {
                            page: data.data.data,
                            sort: this.$store.state.sort.pages
                        });
                    })
                    .catch(error => {
                        self.add.buttonLoading = false;
                    });
                }
            },
            handleEditPage() {
                if(this.edit.title.length == 0) {
                    if (this.edit.oneTime == false) {
                        flash('Page title field is required.', 3000);
                        this.edit.oneTime = true;
                    }
                    document.getElementById('editpage').focus();
                } else {
                    this.edit.buttonLoading = true;
                    let self = this;
                    axios.patch(route('page.update', { page: this.edit.id }), {
                        title: this.edit.title
                    })
                    .then(data => {
                        self.edit.buttonLoading = false;
                        self.$store.dispatch('setPageEditMode', false);
                        self.$store.dispatch('editPage', {
                            id: self.edit.id,
                            page: data.data.data
                        });
                        self.edit.title = '';
                        self.edit.id = null;
                    })
                    .catch(error => {
                        self.edit.buttonLoading = false;
                    });
                }
            },
            handleSelectCard (page) {
                this.$router.push({ name: 'home', params: {
                        category_path: 'category',
                        category: page.category_id,
                        page_path: 'page',
                        page: page.id
                    }
                });
            },
            handleActiveEditMode () {
                this.edit.title = this.selectedCardTitle;
                this.edit.id = this.selectedCardId;
                this.$store.dispatch('setPageEditMode', true);
                setTimeout(() => {
                    document.getElementById('editPage').focus();
                }, 100);
            },
            handleRemovePage () {
                let self = this;
                let confirmBox = confirm("Are you sure you want to delete this page '" + this.selectedCardTitle +"'?");
                if (confirmBox == true) {
                    this.$store.dispatch('setPageEditMode', false);
                    axios.delete(route('page.destroy', { page: this.selectedCardId }))
                    .then(data => {
                        self.$store.dispatch('deletePage', this.selectedCardId);
                        this.$store.dispatch('setSelectedPage', {
                            id: undefined,
                            title: '',
                            markdown: ''
                        });
                    });
                }
            },
            handelPagesSorting () {
                this.$store.dispatch('syncPages', {
                    pages: this.pages,
                    sort: this.$store.state.sort.pages
                });
            },
            handleAddfocus () {
                setTimeout(() => {
                    document.getElementById('addPage').focus();
                }, 100);
            },
            handelHideAddForm () {
                this.$store.dispatch('setPagesAddFormVisibility', false);
                this.$emit('addFocus');
            },
            handelHideEditForm () {
                this.$store.dispatch('setPagesEditFormVisibility', false);
            },
            setContentHeight (pageHeight) {
                let less1 = 149;
                let less2 = 152;
                let height1 = pageHeight - less1;
                let height2 = pageHeight - less2;
                if(this.addFormVisiblity == true || this.editFormVisiblity == true) {
                    height1 = height1 - 50;
                    height2 = height2 - 50;
                }
                this.blockHeight.height = height1 + 'px';
                this.listHeight.height = height2 + 'px';
            }
        }
    }
</script>
