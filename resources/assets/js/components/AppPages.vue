<template>
    <div class="app-pages" v-bind:class="[pageFormVisiblity == true ? hideClass : '']">
        <pages-head
            heading="Pages"
            sortMsg="Sort pages"
            createMsg="Create a page"
            :showForm="showForm"
            @pagesButton="formStatus($event)"
        />
        <transition name="form-fade">
            <div v-if="showForm" class="page-form">
                <div class="input-group">
                    <input type="text" class="input page-input" name="title" v-model="pageTitle" placeholder="Page name">
                    <button type="button" class="button">Add</button>
                </div>
            </div>
        </transition>
        <div v-bar>
            <div class="app-cards" :class="[showForm ? lessHeightClass : '']">
                <!-- <div v-if="loading" class="loader-bg h100"></div>
                <error v-else-if="error"></error>
                <div class="app-cards-container" v-else-if="nums.length > 0">
                    <transition-group name="list" tag="div">
                        <card
                            v-for="num in nums"
                            :key="num"
                            card-title="Page name!"
                            color="#ffc107"
                            @click.native="selectedCard = num"
                            @click.right.native="selectedCard = num"
                            v-bind:class="[selectedCard == num ? selectClass : '']"
                            @contextmenu.prevent.native="$refs.pagesMenu.open"
                        />
                    </transition-group>
                </div>
                <empty v-else name="Pages" icon="pages" class="h100"></empty> -->
                <empty name="Pages" icon="pages" class="h100"></empty>
            </div>
        </div>
        <context-menu id="context-menu" ref="pagesMenu">
            <li><a href="#">Open</a></li>
            <li><a href="#">Edit</a></li>
            <li><a href="#" class="danger" @click="removePage">Delete</a></li>
        </context-menu>
    </div>
</template>

<script>
    import contextMenu from 'vue-context-menu';

    export default {
        data() {
            return {
                nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                selectedCard: undefined,
                selectClass: 'selected',
                lessHeightClass: 'less-height',
                pageTitle: '',
                showForm: false,
                hideClass: 'slide-hide',
                loading: false,
                error: false
            }
        },
        components: { contextMenu },
        computed: {
            pageFormVisiblity() {
                return this.$store.state.pageFormVisiblity;
            },
        },
        methods: {
            removePage: function () {
                this.$delete(this.nums, this.selectedCard)
            },
            formStatus: function (e) {
                this.showForm = e;
            }
        }
    }
</script>
