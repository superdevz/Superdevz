<template>
    <div class="app-card">
        <div class="app-card-drag drag-handle" title="Drag to order">
            <i class="fas fa-ellipsis-v"></i>
        </div>
        <div class="app-card-wrapper">
            <h3
                class="app-card-heading"
                @click="handleSelectCard()"
            >
                {{ cardTitle }}
            </h3>
            <div class="app-card-circle-warpper" v-if="color" @click="handleSelectCard()">
                <color-circle :color="color" innerClass="app-card-circle"></color-circle>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: [ 'cardTitle', 'color', 'single', 'cardType' ],
        methods: {
            handleSelectCard () {
                if(this.cardType == 'category') {
                    this.$router.push({ name: 'home', params: {
                            category_path: 'category',
                            category: this.single.id
                        }
                    });
                } else {
                    this.$router.push({ name: 'home', params: {
                            category_path: 'category',
                            category: this.single.category_id,
                            page_path: 'page',
                            page: this.single.id
                        }
                    });
                }
            }
        }
    }
</script>
