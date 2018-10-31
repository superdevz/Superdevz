<template>
    <div class="app-auth h100">
        <div class="app-auth-container">
            <div class="app-auth-intro">
                <h1 class="text-center">Codolog</h1>
                <p class="sub-text">Your notes, simplified</p>
                <div class="intro-boxes">
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/idea.svg" alt="idea">
                        </div>
                        <div class="intro-text">Save ideas, thoughts and notes easily</div>
                    </div>
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/programmer.svg" alt="programmer">
                        </div>
                        <div class="intro-text">For developers, by developer</div>
                    </div>
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/text.svg" alt="text">
                        </div>
                        <div class="intro-text">Support markdown markup</div>
                    </div>
                </div>
                <div class="intro-boxes intro-bottom">
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/open.svg" alt="open">
                        </div>
                        <div class="intro-text">Open and free</div>
                    </div>
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/cloud.svg" alt="cloud">
                        </div>
                        <div class="intro-text">Cloud based server</div>
                    </div>
                    <div class="intro-box">
                        <div class="intro-icon">
                            <img src="images/secure.svg" alt="secure">
                        </div>
                        <div class="intro-text">Secure</div>
                    </div>
                </div>
            </div>
            <div class="app-auth-form">
                <div class="app-auth-signin" v-if="$route.params.form == 'signin' || $route.params.form == undefined || ( $route.params.form != 'signup' && $route.params.form != 'forgot' && $route.params.form != 'reset' )">
                    <h2>Sign in</h2>
                    <form autocomplete="off" @submit.prevent="handleSignIn" @keydown="errors.signin.clear($event.target.dataset.name)">
                        <div class="input-field">
                            <label for="signin-email">Email</label>
                            <input type="text" id="signin-email" class="input" v-model="signin.email" data-name="email">
                            <message :text="errors.signin.get('email')" :visible="errors.signin.has('email')"></message>
                        </div>
                        <div class="input-field">
                            <label for="signin-password">Password</label>
                            <input type="password" id="signin-password" class="input" v-model="signin.password" data-name="password">
                            <message :text="errors.signin.get('password')" :visible="errors.signin.has('password')"></message>
                        </div>
                        <div>
                            <input type="checkbox" id="signin-remember" v-model="signin.remember">
                            <label for="signin-remember">Remember me</label>
                        </div>
                        <div>
                            <button class="button full-button" :class="[signin.buttonLoading ? loadingClass : '']" :disabled="signin.buttonLoading" type="submit">Sign in</button>
                        </div>
                    </form>
                    <div class="form-links text-center">
                        <p><router-link :to="{ name: 'auth', 'params': { 'form': 'signup' } }">Create a new account</router-link></p>
                        <p><router-link :to="{ name: 'auth', 'params': { 'form': 'forgot' } }">Forgot your password</router-link></p>
                    </div>
                </div>
                <div class="app-auth-signup" v-else-if="$route.params.form == 'signup'">
                    <h2>Sign up</h2>
                    <form autocomplete="off" @submit.prevent="handleSignUp" @keydown="errors.signup.clear($event.target.dataset.name)">
                        <div class="input-field">
                            <label for="signup-name">Name</label>
                            <input type="text" id="signup-name" class="input" v-model="signup.name" data-name="name">
                            <message :text="errors.signup.get('name')" :visible="errors.signup.has('name')"></message>
                        </div>
                        <div class="input-field">
                            <label for="signup-email">Email</label>
                            <input type="text" id="signup-email" class="input" v-model="signup.email" data-name="email">
                            <message :text="errors.signup.get('email')" :visible="errors.signup.has('email')"></message>
                        </div>
                        <div class="input-field">
                            <label for="signup-password">Password</label>
                            <input type="password" id="signup-password" class="input" v-model="signup.password" data-name="password">
                            <message :text="errors.signup.get('password')" :visible="errors.signup.has('password')"></message>
                        </div>
                        <div>
                            <button class="button full-button" :class="[signup.buttonLoading ? loadingClass : '']" :disabled="signup.buttonLoading" type="submit">Sign up</button>
                        </div>
                    </form>
                    <div class="form-links text-center">
                        <p><router-link :to="{ 'name': 'auth', 'params': { 'form': 'signin' }}">Back to Sign in</router-link></p>
                        <p><router-link :to="{ 'name': 'auth', 'params': { 'form': 'forgot' }}">Forgot your password</router-link></p>
                    </div>
                </div>
                <div class="app-auth-signup" v-else-if="$route.params.form == 'forgot'">
                    <h2>Forgot password</h2>
                    <form autocomplete="off" @submit.prevent="handleForgotPassword" @keydown="errors.forgot.clear($event.target.dataset.name)">
                        <div class="input-field">
                            <label for="forgot-email">Email</label>
                            <input type="text" id="forgot-email" class="input" v-model="forgot.email" data-name="email">
                            <message :text="errors.forgot.get('email')" :visible="errors.forgot.has('email')"></message>
                        </div>
                        <div>
                            <button class="button full-button" :class="[forgot.buttonLoading ? loadingClass : '']" :disabled="forgot.buttonLoading" type="submit">Reset password</button>
                        </div>
                    </form>
                    <div class="form-links text-center">
                        <p><router-link :to="{ 'name': 'auth', 'params': { 'form': 'signin' }}">Back to Sign in</router-link></p>
                    </div>
                </div>
                <div class="app-auth-signup" v-else-if="$route.params.form == 'reset'">
                    <h2>Reset password</h2>
                    <form autocomplete="off" @submit.prevent="handleResetPassword" @keydown="errors.reset.clear($event.target.dataset.name)">
                        <div class="input-field">
                            <label for="reset-email">Email</label>
                            <input type="text" id="reset-email" class="input" v-model="reset.email" data-name="email">
                            <message :text="errors.reset.get('email')" :visible="errors.reset.has('email')"></message>
                        </div>
                        <div class="input-field">
                            <label for="reset-password">Password</label>
                            <input type="password" id="reset-password" class="input" v-model="reset.password" data-name="password">
                            <message :text="errors.reset.get('password')" :visible="errors.reset.has('password')"></message>
                        </div>
                        <div class="input-field">
                            <label for="reset-password-confirmation">Repeat Password</label>
                            <input type="password" id="reset-password-confirmation" class="input" v-model="reset.passwordConfirmation" data-name="password_confirmation">
                            <message :text="errors.reset.get('password_confirmation')" :visible="errors.reset.has('password_confirmation')"></message>
                        </div>
                        <div>
                            <button class="button full-button" :class="[reset.buttonLoading ? loadingClass : '']" :disabled="reset.buttonLoading" type="submit">Reset password</button>
                        </div>
                    </form>
                </div>
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
                loadingClass: 'button-loader',
                errors: {
                    signup: new Errors(),
                    signin: new Errors(),
                    forgot: new Errors(),
                    reset: new Errors()
                },
                signin: {
                    email: '',
                    password: '',
                    remember: '',
                    buttonLoading: false
                },
                signup: {
                    name: '',
                    email: '',
                    password: '',
                    buttonLoading: false
                },
                forgot: {
                    email: '',
                    buttonLoading: false
                },
                reset: {
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    buttonLoading: false
                }
            }
        },
        watch: {
            '$route' (toRoute, fromRoute) {
                let siteTitle = 'Codolog | ';
                if(toRoute.params.form == 'signin') {
                    document.title = siteTitle + "Sign in";
                } else if(toRoute.params.form == 'signup') {
                    document.title = siteTitle + "Sign up";
                } else if(toRoute.params.form == 'forgot') {
                    document.title = siteTitle + "Forgot password";
                } else if(toRoute.params.form == 'reset') {
                    document.title = siteTitle + "Reset password";
                }
            }
        },
        methods:{
            handleSignIn: function () {
                this.signin.buttonLoading = true;
                this.errors.signin.record({});
                let remember = this.signin.remember == '' ? false : true;
                let self = this;
                axios.post(route('signin'), {
                    email: this.signin.email,
                    password: this.signin.password,
                    remember: remember
                })
                .then(data => {
                    self.$store.dispatch('setupProfile', data.data.later).then(() => {
                        self.signin.buttonLoading = false;
                        self.signin.email = '';
                        self.signin.password = '';
                        self.signin.remember = false;
                    });
                })
                .catch(error => {
                    self.signin.buttonLoading = false;
                    self.errors.signin.record(error.response.data.errors);
                });
            },
            handleSignUp: function () {
                this.signup.buttonLoading = true;
                this.errors.signup.record({});
                let self = this;
                axios.post(route('signup'), {
                    name: this.signup.name,
                    email: this.signup.email,
                    password: this.signup.password
                })
                .then(data => {
                    self.$store.dispatch('setupProfile', data.data.later).then(() => {
                        self.signup.buttonLoading = false;
                        self.signup.name = '';
                        self.signup.email = '';
                        self.signup.password = '';
                    });
                })
                .catch(error => {
                    self.signup.buttonLoading = false;
                    self.errors.signup.record(error.response.data.errors);
                });
            },
            handleForgotPassword: function () {
                this.forgot.buttonLoading = true;
                this.errors.forgot.record({});
                let self = this;
                axios.post(route('forgot'), {
                    email: this.forgot.email
                })
                .then(data => {
                    self.forgot.buttonLoading = false;
                    self.forgot.email = '';
                })
                .catch(error => {
                    self.forgot.buttonLoading = false;
                    self.errors.forgot.record(error.response.data.errors);
                });
            },
            handleResetPassword: function () {
                this.reset.buttonLoading = true;
                this.errors.reset.record({});
                let self = this;
                axios.post(route('reset'), {
                    email: this.reset.email,
                    password: this.reset.password,
                    password_confirmation: this.reset.passwordConfirmation,
                    token: this.$route.params.token
                })
                .then(data => {
                    self.$store.dispatch('setupProfile', data.data.later).then(() => {
                        this.reset.buttonLoading = false;
                    });
                })
                .catch(error => {
                    this.reset.buttonLoading = false;
                    this.errors.reset.record(error.response.data.errors);
                });
            }
        }
    }
</script>
