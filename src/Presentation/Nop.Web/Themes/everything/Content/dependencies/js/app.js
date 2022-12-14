var PIXELSIGNS = PIXELSIGNS || {};
! function(t) {
    "use strict";
    PIXELSIGNS.initialize = {
        init: function() {
            PIXELSIGNS.initialize.general(), PIXELSIGNS.initialize.sectionBackground(), PIXELSIGNS.initialize.sectionSwitch(), PIXELSIGNS.initialize.portfolio(), PIXELSIGNS.initialize.countUp(), PIXELSIGNS.initialize.swiperSlider(), PIXELSIGNS.initialize.googleMap(), PIXELSIGNS.initialize.contactFrom()
        },
        general: function() {
            new WOW({
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !1,
                live: !0,
                scrollContainer: null
            }).init(),
            //  t("body").on("contextmenu", function(t) {
            //     return t.preventDefault(), t.stopPropagation(), !1
            // }),
             t(document).on("keydown", function(t) {
                return !(t.ctrlKey && 85 == t.keyCode || t.ctrlKey && t.shiftKey && 73 == t.keyCode || t.ctrlKey && t.shiftKey && 75 == t.keyCode || t.metaKey && t.shiftKey && 91 == t.keyCode)
            }), t(".faq .card").each(function() {
                var e = t(this);
                e.on("click", function(i) {
                    var a = e.hasClass("active");
                    t(".faq .card").removeClass("active"), a ? e.removeClass("active") : e.addClass("active")
                })
            }), t(".popup-video").magnificPopup({
                type: "iframe"
            }), t(".pricing-tab-switcher, .tab-btn").on("click", function() {
                t(".pricing-tab-switcher, .tab-btn").toggleClass("active"), t(".pricing-tab").toggleClass("seleceted"), t(".pricing-amount").toggleClass("change-subs-duration")
            }), t(".tabs-box").length && t(".tabs-box .pricing-tab  .tab-btn").on("click", function(e) {
                e.preventDefault();
                var i = t(t(this).attr("data-tab"));
                if (t(i).is(":visible")) return !1;
                i.parents(".tabs-box").find(".pricing-tab ").find(".tab-btn").removeClass("active-btn"), t(this).addClass("active-btn"), i.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0), i.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab animated fadeIn"), t(i).fadeIn(300), t(i).addClass("active-tab animated fadeIn")
            }), t("#pix-tabs-nav li:nth-child(2)").addClass("active"), t("#pix-tabs-content .content").hide(), t("#pix-tabs-content .content:nth-child(2)").show(), t("#pix-tabs-nav li").on("click", function() {
                t("#pix-tabs-nav li").removeClass("active"), t(this).addClass("active"), t("#pix-tabs-content .content").hide();
                var e = t(this).find("a").attr("href");
                return t(e).fadeIn(400), !1
            }), t(".site-main-menu li a").each(function() {
                t(this).attr("href") == location.href.split("/").slice(-1) && t(this).addClass("current_page")
            })
        },
        swiperSlider: function() {
            t(".swiper-container").each(function() {
                var e = t(this).attr("id"),
                    i = t(this).data("perpage") || 1,
                    a = t(this).data("loop") || !0,
                    n = t(this).data("speed") || 700,
                    o = t(this).data("autoplay") || 5e3,
                    s = t(this).data("slidegroup") || 1,
                    r = t(this).data("space") || 0,
                    l = t(this).data("effect"),
                    c = t(this).data("direction") || "horizontal",
                    d = t(this).data("breakpoints");
                new Swiper("#" + e, {
                    slidesPerView: i,
                    spaceBetween: r,
                    slidesPerGroup: s,
                    loop: a,
                    speed: n,
                    effect: l,
                    direction: c,
                    breakpoints: d,
                    autoplay: {
                        delay: o,
                        disableOnInteraction: !1
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: !0
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                })
            })
        },
        portfolio: function() {
            if (void 0 !== t.fn.imagesLoaded && void 0 !== t.fn.isotope) {
                t(".pixsass-portfolio-items").imagesLoaded(function() {
                    var i = t(".pixsass-portfolio-items");
                    i.isotope({
                        itemSelector: ".pixsass-portfolio-item",
                        percentPosition: !0,
                        transitionDuration: "0.5s",
                        masonry: {
                            columnWidth: ".grid-sizer",
                            layoutMode: "masonry"
                        }
                    }), t(".pixsass-isotope-filter a").on("click", function() {
                        t(".pixsass-isotope-filter").find(".current").removeClass("current"), t(this).parent().addClass("current");
                        var e = t(this).attr("data-filter");
                        return i.isotope({
                            filter: e
                        }), !1
                    }), t(window).resize(function() {
                        i.isotope(), e.masonry()
                    })
                });
                var e = t(".blog-items");
                e.masonry({
                    itemSelector: ".blog-item",
                    percentPosition: !0
                })
            }
        },
        mobileMenu: function() {
            t(window).width() < 991 && (t(".site-main-menu li.active").addClass("open").children("ul").show(), t(".site-main-menu li.menu-item-has-children>a").on("click", function() {
                t(this).removeAttr("href");
                var e = t(this).parent("li");
                e.hasClass("open") ? (e.removeClass("open"), e.find("li").removeClass("open"), e.find("ul").slideUp(400)) : (e.addClass("open"), e.children("ul").slideDown(400), e.siblings("li").children("ul").slideUp(400), e.siblings("li").removeClass("open"), e.siblings("li").find("li").removeClass("open"), e.siblings("li").find("ul").slideUp(400))
            })), t(".toggle-menu").on("click", function(e) {
                e.preventDefault();
                t("body").toggleClass("open-menu"), t('<div class="mask-overlay">').hide().appendTo("body").fadeIn("fast"), t(".mask-overlay, .close-menu").on("click", function() {
                    t("body").removeClass("open-menu"), t(".mask-overlay").remove()
                })
            })
        },
        sectionBackground: function() {
            t("[data-bg-image]").each(function() {
                var e = t(this).data("bg-image");
                t(this).css({
                    backgroundImage: "url(" + e + ")"
                })
            })
        },
        sectionSwitch: function() {
            t('[data-type="section-switch"], #menu-home li a, .scroll-btn').on("click", function() {
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                    var e = t(this.hash);
                    if (e.length > 0) return e = e.length ? e : t("[name=" + this.hash.slice(1) + "]"), t("html,body").animate({
                        scrollTop: e.offset().top
                    }, 1e3), !1
                }
            })
        },
        countUp: function() {
            var e = {
                    useEasing: !0,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    prefix: "",
                    suffix: ""
                },
                i = t("[data-counter]");
            i && i.each(function() {
                var i = t(this).data("counter"),
                    a = new CountUp(this, 0, i, 0, 2.5, e);
                t(this).appear(function() {
                    a.start()
                }, {
                    accX: 0,
                    accY: 0
                })
            })
        },
        googleMap: function() {
            t(".gmap3-area").each(function() {
                var e = t(this),
                    i = (e.data("key"), e.data("lat")),
                    a = e.data("lng"),
                    n = e.data("mrkr");
                e.gmap3({
                    center: [i, a],
                    zoom: 8,
                    scrollwheel: !1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{
                        featureType: "administrative.country",
                        elementType: "geometry.fill",
                        stylers: [{
                            visibility: "on"
                        }]
                    }]
                }).marker(function(t) {
                    return {
                        position: t.getCenter(),
                        icon: n
                    }
                })
            })
        },
        contactFrom: function() {
            t("[data-pixsaas]").each(function() {
                var e = t(this);
                t(".form-result", e).css("display", "none"), e.submit(function() {
                    t('button[type="submit"]', e).addClass("clicked");
                    var i = {};
                    return t("[name]", e).each(function() {
                        var e = t(this),
                            a = e.attr("name"),
                            n = e.val();
                        i[a] = n
                    }), t.ajax({
                        url: e.attr("action"),
                        type: "POST",
                        data: i,
                        success: function(i) {
                            1 == i.error ? t(".form-result", e).addClass("alert-warning").removeClass("alert-success alert-danger").css("display", "block") : t(".form-result", e).addClass("alert-success").removeClass("alert-warning alert-danger").css("display", "block"), t(".form-result > .content", e).html(i.message), t('button[type="submit"]', e).removeClass("clicked")
                        },
                        error: function() {
                            t(".form-result", e).addClass("alert-danger").removeClass("alert-warning alert-success").css("display", "block"), t(".form-result > .content", e).html("Sorry, an error occurred."), t('button[type="submit"]', e).removeClass("clicked")
                        }
                    }), !1
                })
            })
        }
    }, PIXELSIGNS.documentOnReady = {
        init: function() {
            PIXELSIGNS.initialize.init()
        }
    }, PIXELSIGNS.documentOnLoad = {
        init: function() {
            t(".page-loader").fadeOut("slow")
        }
    }, PIXELSIGNS.documentOnResize = {
        init: function() {}
    }, PIXELSIGNS.documentOnScroll = {
        init: function() {
            PIXELSIGNS.initialize.sectionBackground(), t(window).scrollTop() > 300 ? t(".return-to-top").addClass("back-top") : t(".return-to-top").removeClass("back-top")
        }
    }, t(document).ready(PIXELSIGNS.documentOnReady.init), t(window).on("load", PIXELSIGNS.documentOnLoad.init), t(window).on("resize", PIXELSIGNS.documentOnResize.init), t(window).on("scroll", PIXELSIGNS.documentOnScroll.init)
}(jQuery);