var $menu = ".menu";
var $burger = document.getElementsByClassName("navbar-burger")[0];
var $nav = document.getElementsByTagName("nav")[0];
var $navbarItems = ".list>.navbar-item";


//region vuejs
var app = new Vue({
    el: "#main",
    data: {
        menuVisible: 0,
        //region sitedata
        sitename: "EURISTICA",
        tagline: "Euristica, annual codefest",
        sponsors: [
            "Sponsor",
            "Sponsor",
            "Sponsor",
        ],
        about: `
        This generation has seen great programmers like Linus Torvalds and Jeff Dean.
        Talented and hardworking programmers are rising all around the globe. To foster this
        amazing skill and culture, the Department of Computer Science and Engineering, IIT
        Indore presents you with - Euristica’18, the annual coding festival of our college.
        We will be conducting a variety of events ranging from Competitive Programming and
        Application Development to Cyber Security and Machine Learning.
        `,
        events: [{
            title: "Divide By Zero",
            date: "12th March",
            desc: `
             It is a short-duration (2.5 hours) individual competitive programming contest. The contest will consist of 7-8 problems and
            is meant to test the algorithmic and implementation skills of the contestants along with
            their speed and accuracy of problem solving. It is our flagship event which we have been
            organising for 6 years now.`
        },
        {
            title: "Hackathon",
            date: "13th March",
            desc: `Hackathon is a team development event. The duration will be 24 to 48 hours. Multiple
                    problem statements will be provided at the beginning of the event. The contestants will
                    get the entire time in which they have to select one of the problem statements, finalise
                    the technological stack and work on the implementation.
                    `
        },
        {
            title: "Capture The Flag",
            date: "14th March",
            desc: `A special kind of cybersecurity competition designed to challenge its participants to solve
                    computer security problems and/or capture and defend computer systems.
                    `
        },
        {
            title: "Machine Learning Codesprint",
            date: "15th March",
            desc: `“Information is the oil of the 21st century, and analytics is the combustion engine.”`
        },
        {
            title: "Code Mélange III",
            date: "16th March",
            desc: `A long algorithmic programming
                contest that will push your brain to
                the limit!
                `
        },
        {
            title: "Code Golf 4.0",
            date: "17th March",
            desc: `Code Golf is a unique competitive coding challenge in which “Less is More​"​.`
        },
        {
            title: "Surprise Language IV",
            date: "18th March",
            desc: `‘Coz who doesn’t like surprises?`
        }],
        //endregion
        form: {
            name: "",
            email: ""
        },
        se: null
    },
    methods: {
        emailIsInvalid() {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.form.email == "" ? 0 : !regex.exec(this.form.email);
        },
        toggleMenu() {
            TweenMax.set($navbarItems, { scale: 0 });
            TweenMax.to($menu, 0.5, { opacity: !this.menuVisible });

            if (this.menuVisible) {
                TweenMax.set($menu, { visibility: 'hidden', delay: 0.5 });
            } else {
                TweenMax.set($menu, { visibility: 'visible' });
                TweenMax.staggerTo($navbarItems, 0.5, { scale: 1, ease: Back.easeOut }, 0.2);
            }
            this.menuVisible = !this.menuVisible;
        },
        scrollTo(id) {
            TweenMax.to(window, 1, { scrollTo: id, ease: Power4.easeOut });
        },
        showEvent(event) {
            this.$set(this, "se", event);
            Vue.nextTick(function () {
                TweenMax.fromTo("#event-modal-card", 0.5, { scaleY: 0 }, { scaleY: 1, ease: Back.easeOut });
            });
        },
        dismissEvent() {
            TweenMax.fromTo("#event-modal-card", 0.2, { scaleY: 1 }, {
                scaleY: 0, ease: Power4.easeOut, onComplete: function () {
                    this.$set(this, "se", null);
                },
                onCompleteScope: this
            });
        }
    }
})
//endregion

//region hide nav on scroll
var $lastScroll = -1;
window.addEventListener("scroll", () => {
    var scroll = window.scrollY;
    if (scroll > $lastScroll) {
        //hide 
        TweenMax.to("nav", 0.7, { yPercent: -100, ease: Power4.easeOut });
    } else {
        TweenMax.to("nav", 0.7, { yPercent: 0, ease: Power4.easeOut });
    }
    $lastScroll = scroll;
});
//endregion