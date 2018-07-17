<template>
    <div>
        <div class="app-page-head">
            <h1><color-circle v-if="color" :color="color" innerClass="app-page-circle"></color-circle>{{ page.title }}</h1>
            <div class="app-page-buttons" v-if="pageFormVisibility">
                <button class="app-discard-button danger button" @click="handleEditDiscard">
                    <span class="fa-layers fa-fw">
                        <i class="fas fa-minus-circle"></i>
                    </span> Discard
                </button>
                <button class="app-save-button button" :class="[saveButtonLoading ? loadingClass : '']" :disabled="saveButtonLoading" @click="handleEditSave">
                    <span class="fa-layers fa-fw">
                        <i class="far fa-save"></i>
                    </span> Save
                </button>
            </div>
            <div class="app-page-buttons" v-if="!pageFormVisibility">
                <button class="app-save-button button" @click="handleEditPage">
                    <span class="fa-layers fa-fw">
                        <i class="far fa-edit"></i>
                    </span> Edit page
                </button>
            </div>
        </div>
        <div v-bar>
            <div class="app-page-contents-inner syncscroll" name="syncscroll" id="page-preview" v-html="pageMarkdown"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import markdown from '../markdown';

    export default {
        data() {
            return {
                emptyText: '<p style="color: #6b6b6b"><i>Nothing here, Write something amazing ツ</i></p>',
                saveButtonLoading: false,
                loadingClass: 'button-loader',
            }
        },
        mounted () {
            let isSyncingLeftScroll = false;
            let isSyncingRightScroll = false;
            let leftDiv = document.getElementById('page-textarea');
            let rightDiv = document.getElementById('page-preview');

            leftDiv.onscroll = function() {
                if (!isSyncingLeftScroll) {
                    isSyncingRightScroll = true;
                    rightDiv.scrollTop = this.scrollTop;
                }
                isSyncingLeftScroll = false;
            }

            rightDiv.onscroll = function() {
                if (!isSyncingRightScroll) {
                    isSyncingLeftScroll = true;
                    leftDiv.scrollTop = this.scrollTop;
                }
                isSyncingRightScroll = false;
            }
        },
        props: [ 'page' ],
        computed: {
            pageFormVisibility () {
                return this.$store.state.pageFormVisibility;
            },
            pageFormTextarea () {
                return this.$store.state.pageFormTextarea;
            },
            pageMarkdown () {
                if (this.$store.state.pageFormVisibility == false) {
                    return this.page.markdown == '' ? this.emptyText : markdown.render(this.page.markdown);
                } else {
                    return this.pageFormTextarea == '' ? this.emptyText : markdown.render(this.pageFormTextarea);
                }
            },
            color () {
                return this.$store.getters.getCategoryColor(this.page.category_id);
            },
            selectedCardId () {
                return this.$store.state.selectedCard.pages.id;
            }
        },
        watch: {
            pageFormTextarea (val) {
                if(this.pageFormVisibility == true) {
                    if (val.trim() === this.page.markdown.trim()) {
                        this.removeBeforeClose();
                    } else {
                        this.addBeforeClose();
                    }
                }
            }
        },
        methods: {
            handleEditPage () {
                this.$store.dispatch('setPageFormTextarea', this.page.markdown);
                this.$store.dispatch('setPageFormVisibility', true);
                setTimeout(() => {
                    document.getElementById('page-textarea').focus();
                }, 100);
            },
            handleEditDiscard () {
                this.$store.dispatch('setPageFormVisibility', false);
                this.removeBeforeClose();
                setTimeout(() => {
                    this.$store.dispatch('setPageFormTextarea', '');
                }, 100);
            },
            handleEditSave () {
                this.saveButtonLoading = true;
                let self = this;
                let selectedCardId = this.selectedCardId;
                axios.patch(route('page.markdown', { page: selectedCardId }), {
                    markdown: this.pageFormTextarea
                })
                .then(data => {
                    self.saveButtonLoading = false;
                    self.$store.dispatch('editPage', {
                        id: selectedCardId,
                        page: data.data.data
                    });
                    self.$store.dispatch('setPageFormTextarea', '');
                    self.$store.dispatch('setPageFormVisibility', false);
                    self.removeBeforeClose();
                })
                .catch(error => {
                    self.saveButtonLoading = false;
                });
            },
            addBeforeClose () {
                window.addEventListener('beforeunload', this.beforeClose);
            },
            removeBeforeClose () {
                window.removeEventListener('beforeunload', this.beforeClose);
            },
            beforeClose (e) {
                var confirmationMessage = 'If you leave before saving, your changes will be lost.';
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            }
        }
    }
</script>
