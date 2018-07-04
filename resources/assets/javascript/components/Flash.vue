<template>
    <div class="fixed-alert-block">
        <div class="fixed-alert">
            <slot></slot>
            <span class="dismiss-alert" @click="hideAlert"><i class="fas fa-times"></i></span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: [ 'timeout', 'id' ],
        mounted() {
            this.onload();
        },
        methods: {
            hideAlert() {
                this.$store.dispatch('hideAlert', this.id);
            },
            onload: function () {
                var self = this;

                (function() {
                    var time = self.timeout,
                    delta = 100,
                    tid;

                    tid = setInterval(function() {
                        if ( window.blurred ) { return; }    
                        time -= delta;
                        if ( time <= 0 ) {
                            clearInterval(tid);
                            self.$store.dispatch('hideAlert', self.id);
                        }
                    }, delta);
                })();

                window.onblur = function() { window.blurred = true; };
                window.onfocus = function() { window.blurred = false; };
            }
        }
    }
</script>
