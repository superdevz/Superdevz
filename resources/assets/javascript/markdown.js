const Remarkable = require('remarkable');
const hljs = require('highlight.js');

function codeDefaultLang(md) {
    const rule = md.renderer.rules.fence;
    md.renderer.rules.fence = function(tokens, idx, options, env, instance) {
        if(!tokens[idx].params && md.options.langDefault) {
            tokens[idx].params = md.options.langDefault;
        }
        return rule.call(this, tokens, idx, options, env, instance);
    };
}

const markdown = new Remarkable('full', {
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

markdown.use(codeDefaultLang);

export default markdown;