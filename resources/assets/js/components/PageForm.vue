<template>
    <div class="app-page-form" v-bind:class="[pageFormVisiblity == true ? showClass : '']">
        <textarea class="textarea page-textarea syncscroll" id="page-textarea" name="syncscroll" v-model="pageData" @input="sendData" placeholder="Type In, Here"></textarea>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showClass: 'slide-show',
                pageData: '# heading\n' +
                          '## heading\n' +
                          '`<br>` Tag. `CreateUser()` Function.\n' +
                          '```js\n' +
                          'var bar = 5;\n' +
                          'var foo = bar;\n' +
                          'console.log(foo); // returns 5\n' +
                          '```\n' +
                          '> He said "_I have been very happy That day._"\n\n' +
                          'A list of things to do:\n' +
                          '* Make a website.\n' +
                          '* Create a droplet.\n' +
                          '* Upload the website.\n' +
                          '* Buy a domain.\n' +
                          '* Make TLS/SSL certificate.'
            }
        },
        computed: {
            pageFormVisiblity() {
                return this.$store.state.pageFormVisiblity;
            }
        },
        methods: {
            sendData: function () {
                this.$emit('getData', this.pageData);
            }
        }
    }
</script>
