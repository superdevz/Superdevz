<template>
    <div class="app-page">
        <div class="app-page-container">
            <div class="app-page-head">
                <h1>Page title!</h1>
                <span v-if="showForm == false">&nbsp;</span>
                <button v-if="showForm == false" class="app-edit-button button" v-tooltip.top-center="editMsg" @click="showFormEvent">
                    <span class="fa-layers fa-fw">
                        <i class="far fa-edit"></i>
                    </span>
                </button>
                <div class="app-settings-buttons" v-if="showForm">
                    <!-- <button class="app-discard-button button-loader danger button" @click="showFormEvent">
                        <span class="fa-layers fa-fw">
                            <i class="fas fa-minus-circle"></i>
                        </span> Discard
                    </button> -->
                    <button class="app-discard-button danger button" @click="showFormEvent">
                        <span class="fa-layers fa-fw">
                            <i class="fas fa-minus-circle"></i>
                        </span> Discard
                    </button>
                    <button class="app-save-button button" @click="showFormEvent">
                        <span class="fa-layers fa-fw">
                            <i class="far fa-save"></i>
                        </span> Save
                    </button>
                </div>
            </div>
            <div v-bar>
                <div class="app-page-contents syncscroll" id="page-preview" name="syncscroll">
                    <div v-if="loading" class="loader-bg h100"></div>
                    <error v-else-if="error"></error>
                    <empty v-else-if="empty" icon="page" name="Page" class="h100"></empty>
                    <div v-else class="app-page-contents-inner" v-html="mdData"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Remarkable = require('remarkable');
    var hljs = require('highlight.js');

    function codeDefaultLang(md) {
        const rule = md.renderer.rules.fence;
        md.renderer.rules.fence = function(tokens, idx, options, env, instance) {
            if(!tokens[idx].params && md.options.langDefault) {
                tokens[idx].params = md.options.langDefault;
            }
            return rule.call(this, tokens, idx, options, env, instance);
        };
    }

    var md = new Remarkable('full', {
        html: true,
        breaks: true,
        langPrefix: '',
        langDefault: 'unknown',
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {}
            }
            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {}

            return '';
        }
    });

    md.use(codeDefaultLang);

    export default {
        data() {
            return {
                editMsg: 'Edit the page',
                showForm: false,
                empty: false,
                loading: false,
                error: false,
                emptyText: '<p style="color: #6b6b6b"><i>Nothing here, Write something amazing.</i></p>'
            }
        },
        props: [ 'pageData' ],
        methods: {
            showFormEvent: function () {
                this.showForm = !this.showForm;
                if(this.showForm == true) {
                    document.getElementById('page-textarea').focus();
                }
                this.$emit('hideOthers', this.showForm);
            }
        },
        computed: {
            pageFormVisiblity() {
                return this.$store.state.pageFormVisiblity;
            },
            mdData: function () {
                return this.pageData == '' ? this.emptyText : md.render(this.pageData);
            }
        }
    }
</script>
