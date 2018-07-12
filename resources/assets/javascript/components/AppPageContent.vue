<template>
    <div>
        <div class="app-page-head">
            <h1><color-circle v-if="color" :color="color" innerClass="app-page-circle"></color-circle>{{ page.title }}</h1>
            <div class="app-page-buttons" v-if="pageFormVisibility">
                <button class="app-discard-button danger button">
                    <span class="fa-layers fa-fw">
                        <i class="fas fa-minus-circle"></i>
                    </span> Discard
                </button>
                <button class="app-save-button button">
                    <span class="fa-layers fa-fw">
                        <i class="far fa-save"></i>
                    </span> Save
                </button>
            </div>
            <div class="app-page-buttons" v-if="!pageFormVisibility">
                <button class="app-save-button button">
                    <span class="fa-layers fa-fw">
                        <i class="far fa-edit"></i>
                    </span> Edit page
                </button>
            </div>
        </div>
        <div class="app-page-contents-inner" v-html="pageMarkdown"></div>
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
                emptyText: '<p style="color: #6b6b6b"><i>Nothing here, Write something amazing ツ</i></p>'
            }
        },
    //     methods: {
    //         showFormEvent: function () {
    //             this.showForm = !this.showForm;
    //             if(this.showForm == true) {
    //                 document.getElementById('page-textarea').focus();
    //             }
    //             this.$emit('hideOthers', this.showForm);
    //         }
    //     },
        props: [ 'page' ],
        computed: {
            pageFormVisibility () {
                return this.$store.state.pageFormVisibility;
            },
            pageMarkdown () {
                console.log(this.$store.state.pageFormVisibility);
                if (this.$store.state.pageFormVisibility == false) {
                    return this.page.markdown == '' ? this.emptyText : md.render(this.page.markdown);
                } else {
                    // edit page textarea
                }
            },
            color () {
                return this.$store.getters.getCategoryColor(this.page.category_id);
            }
        }
    }
</script>
