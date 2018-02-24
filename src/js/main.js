import Vue from "vue/dist/vue.min.js";
import { TweenMax, Power4, Back } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import sitedata from './sitedata';

import '../scss/main.scss'

const $menu = ".menu";
const $burger = document.getElementsByClassName("navbar-burger")[0];
const $nav = document.getElementsByTagName("nav")[0];
const $navbarItems = ".list>.navbar-item";

//region init Vue
const app = new Vue({
    el: "#main",
    data: {
        menuVisible: 0,
        form: {
            name: "",
            email: ""
        },
        sitedata: sitedata,
        se: null
    },
    methods: {
        emailIsInvalid() {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.form.email == "" ? 0 : !regex.exec(this.form.email);
        },
        toggleMenu() {
            TweenMax.set($navbarItems, { scale: 0 });
            TweenMax.to($menu, 0.2, { opacity: !this.menuVisible });

            if (this.menuVisible) {
                TweenMax.set($menu, { visibility: 'hidden', delay: 0.5 });
            } else {
                TweenMax.set($menu, { visibility: 'visible' });
                TweenMax.staggerTo($navbarItems, 0.2, { scale: 1, ease: Back.easeOut, delay: 0.1 }, 0.1);
            }
            this.menuVisible = !this.menuVisible;
        },
        scrollTo(id) {
            TweenMax.to(window, 1, { scrollTo: id, ease: Power4.easeOut });
        },
        showEvent(event) {
            this.$set(this, "se", event);
            Vue.nextTick(() => {
                TweenMax.fromTo("#event-modal-card", 0.5, { scaleY: 0 }, { scaleY: 1, ease: Back.easeOut });
            });
        },
        dismissEvent() {
            TweenMax.fromTo("#event-modal-card", 0.2, { scaleY: 1 }, {
                scaleY: 0, ease: Power4.easeOut, onComplete: () => {
                    this.$set(this, "se", null);
                },
                onCompleteScope: this
            });
        }
    }
});
//endregion

//region auto hide nav
var $lastScroll = -1;
window.addEventListener("scroll", () => {
    var scroll = window.scrollY;
    if (scroll > $lastScroll) {
        if (app.menuVisible) return;
        //hide 
        TweenMax.to("nav", 0.7, { yPercent: -100, ease: Power4.easeOut });
    } else {
        TweenMax.to("nav", 0.7, { yPercent: 0, ease: Power4.easeOut });
    }
    $lastScroll = scroll;
});
//endregion