<template>
    <div class="app-profile h100">
        <div class="app-profile-data">
            <h1>Your profile</h1>
            <div class="avatar-wrapper">
                <img :src="avatar" alt="Abdalla Arbab">
            </div>
            <p><b>Name:</b> <span v-text="name"></span></p>
            <p><b>Email:</b> <span v-text="email"></span></p>
            <p><b>Member from:</b> <span v-text="joinDate"></span>.</p>
        </div>
        <div class="app-edit-forms">
            <div>
                <h2>Edit profile</h2>
                <form autocomplete="off" @submit.prevent="handleEditProfile" @keydown="errors.editprofile.clear($event.target.dataset.name)">
                    <div class="input-field">
                        <label for="modify-name">Name</label>
                        <input type="text" id="modify-name" class="input" v-model="editprofile.name" data-name="name">
                        <message :text="errors.editprofile.get('name')" :visible="errors.editprofile.has('name')"></message>
                    </div>
                    <div class="input-field">
                        <label for="modify-email">Email</label>
                        <input type="email" id="modify-email" class="input" v-model="editprofile.email" data-name="email">
                        <message :text="errors.editprofile.get('email')" :visible="errors.editprofile.has('email')"></message>
                    </div>
                    <div>
                        <button class="button full-button" :class="[editprofile.buttonLoading ? loadingClass : '']" :disabled="editprofile.buttonLoading" type="submit">Save</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Change password</h2>
                <form @submit.prevent="handleChangePassword" @keydown="errors.changepassword.clear($event.target.dataset.name)">
                    <div class="input-field">
                        <label for="current-password">Your current password</label>
                        <input type="password" id="current-password" class="input" v-model="changepassword.currentPassword" data-name="current_password">
                        <message :text="errors.changepassword.get('current_password')" :visible="errors.changepassword.has('current_password')"></message>
                    </div>
                    <div class="input-field">
                        <label for="new-password">New password</label>
                        <input type="password" id="new-password" class="input" v-model="changepassword.newPassword" data-name="new_password">
                        <message :text="errors.changepassword.get('new_password')" :visible="errors.changepassword.has('new_password')"></message>
                    </div>
                    <div class="input-field">
                        <label for="new-password-confirmation">Repeat password</label>
                        <input type="password" id="new-password-confirmation" class="input" v-model="changepassword.newPasswordConfirmation" data-name="new_password_confirmation">
                        <message :text="errors.changepassword.get('new_password_confirmation')" :visible="errors.changepassword.has('new_password_confirmation')"></message>
                    </div>
                    <div>
                        <button class="button full-button" :class="[changepassword.buttonLoading ? loadingClass : '']" :disabled="changepassword.buttonLoading" type="submit">Change</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Delete the account</h2>
                <div>
                    <p>Be careful! Once you delete your account, all the data is gone.</p>
                    <button class="button full-button danger button-lg delete-account-button" @click="showPasswordForm">Delete account forever</button>
                </div>
                <transition name="dropdown-fade">
                    <form @submit.prevent="handleDeleteAccount" @keydown="errors.deleteaccount.clear($event.target.dataset.name)" v-if="deleteFormVisiblity">
                        <div class="input-field">
                            <label for="delete-account-password">Password</label>
                            <input type="password" id="delete-account-password" class="input" v-model="deleteaccount.accountPassword" data-name="account_password">
                            <message :text="errors.deleteaccount.get('account_password')" :visible="errors.deleteaccount.has('account_password')"></message>
                        </div>
                        <div>
                            <button class="button full-button danger" :class="[deleteaccount.buttonLoading ? loadingClass : '']" :disabled="deleteaccount.buttonLoading" type="submit">Delete the account</button>
                        </div>
                    </form>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Errors from './errors';

    export default {
        data() {
            return {
                deleteFormVisiblity: false,
                loadingClass: 'button-loader',
                errors: {
                    editprofile: new Errors(),
                    changepassword: new Errors(),
                    deleteaccount: new Errors(),
                },
                editprofile: {
                    name: '',
                    email: '',
                    buttonLoading: false
                },
                changepassword: {
                    currentPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                    buttonLoading: false
                },
                deleteaccount: {
                    accountPassword: '',
                    buttonLoading: false
                }
            }
        },
        computed: {
            name() {
                return this.$store.state.profile.name;
            },
            email() {
                return this.$store.state.profile.email;
            },
            joinDate() {
                return this.$store.state.profile.joinDate;
            },
            avatar() {
                return this.$store.state.profile.avatarMd;
            }
        },
        mounted() {
            this.editprofile.name = this.$store.state.profile.name;
            this.editprofile.email = this.$store.state.profile.email;
            this.$store.watch((state) => state.profile.name, (newValue, oldValue) => {
                this.editprofile.name = newValue;
            });
            this.$store.watch((state) => state.profile.email, (newValue, oldValue) => {
                this.editprofile.email = newValue;
            });
        },
        methods: {
            handleEditProfile: function() {
                this.editprofile.buttonLoading = true;
                this.errors.editprofile.record({});
                let self = this;
                axios.patch(route('profile'), {
                    name: this.editprofile.name,
                    email: this.editprofile.email
                })
                .then(data => {
                    self.editprofile.buttonLoading = false;
                    this.$store.dispatch('fetchProfile');
                })
                .catch(error => {
                    self.editprofile.buttonLoading = false;
                    self.errors.editprofile.record(error.response.data.errors);
                });
            },
            handleChangePassword: function() {
                this.changepassword.buttonLoading = true;
                this.errors.changepassword.record({});
                let self = this;
                axios.patch(route('password'), {
                    current_password: this.changepassword.currentPassword,
                    new_password: this.changepassword.newPassword,
                    new_password_confirmation: this.changepassword.newPasswordConfirmation
                })
                .then(data => {
                    self.changepassword.buttonLoading = false;
                    self.changepassword.currentPassword = '';
                    self.changepassword.newPassword = '';
                    self.changepassword.newPasswordConfirmation = '';
                })
                .catch(error => {
                    self.changepassword.buttonLoading = false;
                    self.errors.changepassword.record(error.response.data.errors);
                });
            },
            showPasswordForm: function() {
                this.deleteFormVisiblity = !this.deleteFormVisiblity;
                this.deleteaccount.accountPassword = '';
            },
            handleDeleteAccount: function() {
                this.deleteaccount.buttonLoading = true;
                this.errors.deleteaccount.record({});
                let self = this;
                axios.delete(route('purge', {account_password: this.deleteaccount.accountPassword}))
                .then(data => {
                    self.deleteaccount.buttonLoading = false;
                    self.deleteaccount.accountPassword = '';
                })
                .catch(error => {
                    self.deleteaccount.buttonLoading = false;
                    self.errors.deleteaccount.record(error.response.data.errors);
                });
            }
        }
    }
</script>
