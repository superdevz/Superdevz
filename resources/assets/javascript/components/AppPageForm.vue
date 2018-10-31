<template>
    <div class="app-page-form h100" v-bind:class="[pageFormVisibility == true ? showThisSectionClass : '']">
        <p class="help-text">
            <i class="fas fa-info-circle"></i> This editor supports <a href="https://commonmark.org/help/" target="_blank"><i class="fab fa-markdown"></i> Markdown</a>. Want to learn more about markdown? try this <a href="https://commonmark.org/help/tutorial/" target="_blank">tutorial</a>
        </p>
        <textarea class="textarea page-textarea syncscroll" id="page-textarea" name="syncscroll" v-model="pageFormTextarea" placeholder="Type In, Here" :style="contentHeight"></textarea>
        <transition name="help-slide">
            <div class="app-markdown-examples" v-if="helpMode" :style="helpHeight" v-on-clickaway="hideHelpMode">
                <div class="h100" v-bar>
                    <div class="h100">
                        <div class="app-markdown-examples-inner">
                            <table class="markdown-reference">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Or</th>
                                        <th>… to Get</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>                        
                                        <td class="preformatted">*Italic*</td>
                                        <td class="preformatted second-example">_Italic_</td>
                                        <td><em>Italic</em></td>
                                    </tr>
                                    <tr>                        
                                        <td class="preformatted">**Bold**</td>
                                        <td class="preformatted second-example">__Bold__</td>
                                        <td><strong>Bold</strong></td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            # Heading 1
                                        </td>
                                        <td class="preformatted second-example">
                                            Heading 1<br>
                                            =========
                                        </td>
                                        <td>
                                            <h1 class="smaller-h1">Heading 1</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            ## Heading 2
                                        </td>
                                        <td class="preformatted second-example">
                                            Heading 2<br>
                                            ---------
                                        </td>
                                        <td>
                                            <h2 class="smaller-h2">Heading 2</h2>
                                        </td>
                                    </tr>
                                    <tr>                        
                                        <td class="preformatted">
                                            [Link](http://a.com)
                                        </td>
                                        <td class="preformatted second-example">
                                            [Link][1]<br>
                                            ⋮<br>
                                            [1]: http://b.org
                                        </td>
                                        <td><a href="https://commonmark.org/">Link</a></td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            ![Image](http://url/a.png)
                                        </td>
                                        <td class="preformatted second-example">
                                            ![Image][1]<br>
                                            ⋮<br>
                                            [1]: http://url/b.jpg
                                        </td>
                                        <td>
                                            <img src="images/markdown-logo.svg" width="120" height="120" alt="Markdown">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            &gt; Blockquote
                                        </td>
                                        <td class="preformatted second-example">
                                            &nbsp;
                                        </td>
                                        <td>
                                            <blockquote>Blockquote</blockquote>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            <p>
                                                * List<br>
                                                * List<br>
                                                * List
                                            </p>
                                        </td>
                                        <td class="preformatted second-example">
                                            <p>
                                                - List<br>
                                                - List<br>
                                                - List<br>
                                            </p>
                                        </td>
                                        <td>
                                            <ul>
                                                <li>List</li>
                                                <li>List</li>
                                                <li>List</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            <p>
                                                1. One<br>
                                                2. Two<br>
                                                3. Three
                                            </p>
                                        </td>
                                        <td class="preformatted second-example">
                                            <p>
                                                1) One<br>
                                                2) Two<br>
                                                3) Three
                                            </p>
                                        </td>
                                        <td>
                                            <ol>
                                                <li>One</li>
                                                <li>Two</li>
                                                <li>Three</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            Horizontal Rule<br>
                                            <br>
                                            ---
                                        </td>
                                        <td class="preformatted second-example">
                                            Horizontal Rule<br>
                                            <br>
                                            ***
                                        </td>
                                        <td>
                                            Horizontal Rule
                                            <hr class="custom-hr">
                                        </td>
                                    </tr>
                                    <tr>                        
                                        <td class="preformatted">
                                            `Inline code` with backticks
                                            </td>
                                        <td class="preformatted second-example">
                                            &nbsp;
                                        </td>
                                        <td>
                                            <code class="preformatted">Inline code</code> with backticks
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="preformatted">
                                            ```<br>
                                            # code block<br>
                                            print '3 backticks or'<br> 
                                            print 'indent 4 spaces'<br>                            
                                            ```
                                        </td>
                                        <td class="preformatted second-example"></td>
                                        <td>
                                            <pre># code block
print '3 backticks'</pre>
                                        </td>
                                    </tr>                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="app-markdown-fixed">
            <div class="app-markdown-help" :class="[ glowVisibility == true ? glowClass : '' ]" v-tooltip.right="'Markdown cheatsheet'" @click="handleHelpMode">
                <i class="fab fa-markdown"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        data() {
            return {
                showThisSectionClass: 'slide-show',
                contentHeight: {
                    height: ''
                },
                helpHeight: {
                    height: ''
                },
                helpMode: false,
                glowVisibility: false,
                glowClass: 'glow'
            }
        },
        mixins: [ clickaway ],
        mounted () {
            this.setContentHeight(this.pageHeight);

            if(this.$ls.get('HelpGlowVisibility') == true) {
                this.glowVisibility = true;
            }
        },
        computed: {
            pageFormVisibility() {
                return this.$store.state.pageFormVisibility;
            },
            pageFormTextarea: {
                get () {
                    return this.$store.state.pageFormTextarea;
                },
                set (value) {
                    this.$store.dispatch('setPageFormTextarea', value)
                }
            },
            pageHeight () {
                return this.$store.state.pageHeight;
            }
        },
        watch: {
            pageHeight(val) {
                this.setContentHeight(val);
            }
        },
        methods: {
            setContentHeight (pageHeight) {
                let height1 = pageHeight - 143;
                let height2 = pageHeight - 133;
                this.contentHeight.height = height1 + 'px';
                this.helpHeight.height = height2 + 'px';
            },
            handleHelpMode () {
                if(this.$ls.get('HelpGlowVisibility') == true) {
                    this.$ls.set('HelpGlowVisibility', false);
                    this.glowVisibility = false;
                }
                this.helpMode = !this.helpMode;
            },
            hideHelpMode () {
                this.helpMode = false;
            }
        }
    }
</script>
