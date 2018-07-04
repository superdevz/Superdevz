<template>
    <li v-on-clickaway="hideDropdown">
        <a href="#" @click="toggleDropdown">
            <img :src="avatar" class="app-navbar-avatar" alt="Profile image" width="37px">
        </a>
        <transition name="dropdown-fade">
            <ul v-show="dropdownStatus">
                <li><router-link @click.native="hideDropdown" :to="{ name: 'profile' }"><i class="fas fa-user"></i> Profile</router-link></li>
                <li><a href="#" @click.prevent="signoutEvent"><i class="fas fa-sign-out-alt"></i> Sign out</a></li>
            </ul>
        </transition>
    </li>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        data() {
            return {
                dropdownStatus: false
            }
        },
        mixins: [ clickaway ],
        props: [ 'avatar' ],
        methods: {
            toggleDropdown(e) {
                e.preventDefault();
                this.dropdownStatus = !this.dropdownStatus;
            },
            hideDropdown: function (event) {
                this.dropdownStatus = false;
            },
            signoutEvent: function (event) {
                this.dropdownStatus = false;
                this.$emit('signoutHandler', true);
                axios.post(route('signout'))
                .then(data => {
                    this.$emit('signoutHandler', false);
                })
                .catch(error => {
                    this.$emit('signoutHandler', false);
                });
            }
        }
    }
</script>
