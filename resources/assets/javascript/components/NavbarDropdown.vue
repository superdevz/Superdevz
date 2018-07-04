<template>
    <li v-on-clickaway="hideDropdown">
        <a href="#" @click.prevent="toggleDropdown">
            <img :src="avatar" class="app-navbar-avatar" alt="Profile image" width="37px">
        </a>
        <transition name="dropdown-fade">
            <ul v-show="dropdownVisibility">
                <li><router-link @click.native="hideDropdown" :to="{ name: 'profile' }"><i class="fas fa-user"></i> Profile</router-link></li>
                <li><a href="#" @click.prevent="handleSignout"><i class="fas fa-sign-out-alt"></i> Sign out</a></li>
            </ul>
        </transition>
    </li>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        data() {
            return {
                dropdownVisibility: false
            }
        },
        computed: {
            avatar () {
                return this.$store.state.profile.avatarSm;
            }
        },
        mixins: [ clickaway ],
        methods: {
            toggleDropdown() {
                this.dropdownVisibility = !this.dropdownVisibility;
            },
            hideDropdown() {
                this.dropdownVisibility = false;
            },
            handleSignout() {
                this.hideDropdown();
                this.$store.dispatch('signout');
            }
        }
    }
</script>
