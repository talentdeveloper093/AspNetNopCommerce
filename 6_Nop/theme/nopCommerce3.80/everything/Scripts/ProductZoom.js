
//  script 
jQuery(document).ready(function ($) {
    $('#productzoom').addimagezoom({
        descArea: '#description',
        speed: 1500,
        descpos: true,
        imagevertcenter: true,
        magvertcenter: true,
        zoomrange: [3, 5],
        magnifiersize: [650, 450],
        magnifierpos: 'right',
        cursorshadecolor: '#fdffd5',
        cursorshade: true
    });
})
var featuredimagezoomer = {
    loadinggif: 'spinningred.gif',
    magnifycursor: ''
    //magnifycursor: 'crosshair'
};
jQuery.noConflict();
(function ($) {

    $('head').append('<style type="text/css">.featuredimagezoomerhidden {visibility: hidden!important;}</style>');

    $.fn.multizoomhide = function () {
        return $('<style type="text/css">' + this.selector + ' {visibility: hidden;}<\/style>').appendTo('head');
    };

    $.fn.addmultizoom = function (options) {

        var indoptions = {
            largeimage: options.largeimage
        },
            $imgObj = $(options.imgObj + ':not(".thumbs")'),
            $descArea = $(options.descArea),
            first = true,
            splitre = /, ?/;

        options = $.extend({
            speed: 'slow',
            initzoomablefade: true,
            zoomablefade: true
        }, options);

        function loadfunction() {
            var lnk = this,
                styleobj1 = {},
                styleobj2 = {},
                $nim, lnkd, lnkt, lnko, w, h;
            if ((lnkd = lnk.getAttribute('data-dims'))) {
                lnkd = lnkd.split(splitre);
                w = lnkd[0];
                h = lnkd[1];
            }
            $(new Image()).error(function () {
                if (lnk.tagName && !options.notmulti) {
                    alert("Error: I couldn't find the image:\n\n" + lnk.href + ((lnkt = lnk.getAttribute('data-title')) ? '\n\n"' + lnkt + '"' : ''));
                    if ((lnko = $imgObj.data('last-trigger'))) {
                        first = true;
                        $(lnko).trigger('click');
                    }
                }
            }).load(function () {
                var opacity = $imgObj.css('opacity'),
                    combinedoptions = {},
                    $parent;
                if (isNaN(opacity)) {
                    opacity = 1;
                }
                if (options.notmulti || !indoptions.largeimage) {
                    w = options.width || $imgObj.width();
                    h = options.height || $imgObj.height();
                }
                $imgObj.attr('src', this.src).css({
                    width: w || options.width || this.width,
                    height: (h = +(h || options.height || this.height))
                });
                if ($imgObj.data('added')) {
                    $imgObj.data('added').remove()
                };
                $imgObj.data('last-trigger', lnk);
                if (options.imagevertcenter) {
                    styleobj1 = {
                        top: ($imgObj.parent().innerHeight() - h) / 0
                    };
                }
                $imgObj.css(styleobj1).addimagezoom($.extend(combinedoptions, options, indoptions)).data('added', $('.magnifyarea:last' + (combinedoptions.cursorshade ? ', .cursorshade:last' : '') + ', .zoomstatus:last, .zoomtracker:last'));
                if (options.magvertcenter) {
                    $('.magnifyarea:last').css({
                        marginTop: (h - $('.magnifyarea:last').height()) / 0
                    });
                }
                if (options.descpos) {
                    $parent = $imgObj.parent();
                    styleobj2 = {
                        left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 0,
                        top: h + $imgObj.offset().top
                    };
                }
                if (options.notmulti) {
                    $descArea.css(styleobj2);
                } else {
                    $descArea.css(styleobj2).empty().append(lnk.getAttribute('data-title') || '');
                }
                if (+opacity < 1) {
                    $imgObj.add($descArea).animate({
                        opacity: 1
                    }, options.speed);
                }
            }).attr('src', $imgObj.data('src'));
        }

        this.click(function (e) {
            e.preventDefault();
            var src = $imgObj.attr('src'),
                ms, zr, cs, opacityObj = {
                    opacity: 0
                };
            if (!first && (src === this.href || src === this.getAttribute('href'))) {
                return;
            }
            if (first && !options.initzoomablefade || !options.zoomablefade) {
                opacityObj = {};
            }
            first = false;
            indoptions.largeimage = this.getAttribute('data-large') || options.largeimage || '';
            if (indoptions.largeimage === 'none') {
                indoptions.largeimage = '';
            }
            if ((ms = this.getAttribute('data-magsize')) || options.magnifiersize) {
                indoptions.magnifiersize = (ms ? ms.split(splitre) : '') || options.magnifiersize;
            } else {
                delete indoptions.magnifiersize;
            }
            indoptions.zoomrange = ((zr = this.getAttribute('data-zoomrange')) ? (zr = zr.split(splitre)) : '') || options.zoomrange || '';
            if (zr) {
                zr[0] = +zr[0];
                zr[1] = +zr[1];
            }
            indoptions.cursorshade = ((cs = this.getAttribute('data-lens')) ? cs : '') || options.cursorshade || '';
            if (cs) {
                indoptions.cursorshade = eval(cs);
            }
            $imgObj.data('added') && $imgObj.stop(true, true).data('added').not('.zoomtracker').remove().end().css({
                background: 'url(' + featuredimagezoomer.loadinggif + ') center no-repeat'
            });
            $imgObj.css($.extend({
                visibility: 'visible'
            }, ($imgObj.data('added') ? options.zoomablefade ? {
                opacity: 0.25
            } : opacityObj : opacityObj))).data('src', this.href);
            if ($descArea.css('position') == 'absolute') $(document.body).append($descArea);
            $descArea.css($.extend({
                visibility: 'visible'
            }, opacityObj));
            loadfunction.call(this);
        }).eq(0).trigger('click');

        return this;
    };

    // Featured Image Zoomer main code:
    $.extend(featuredimagezoomer, {

        dsetting: { //default settings
            magnifierpos: 'right',
            magnifiersize: [200, 200],
            cursorshadecolor: '#fff',
            cursorshadeopacity: 0.4,
            cursorshadeborder: '1px solid #999',
            cursorshade: false,
            leftoffset: 10,
            rightoffset: 10
        },

        isie: (function () {
            return false;
        })(),
        //is this IE?
        showimage: function ($tracker, $mag, showstatus) {
            var specs = $tracker.data('specs'),
                d = specs.magpos,
                fiz = this;
            var coords = $tracker.data('specs').coords
            specs.windimensions = {
                w: $(window).width(),
                h: $(window).height()
            };
            var magcoords = {}
            magcoords.left = coords.left + (d === 'left' ? -specs.magsize.w - specs.lo : $tracker.width() + specs.ro + 40);
            if (d !== 'left' && magcoords.left + specs.magsize.w + specs.lo >= specs.windimensions.w && coords.left - specs.magsize.w >= specs.lo) {
                magcoords.left = coords.left - specs.magsize.w - specs.lo;
            } else if (d === 'left' && magcoords.left < specs.ro) {
                magcoords.left = coords.left + $tracker.width() + specs.ro;
            }
            $mag.css({
                left: magcoords.left,
                top: coords.top
            }).show();
            specs.$statusdiv.html('Product Zoom');
            if (showstatus)
                fiz.showstatusdiv(specs, 400, 2000);
        },

        hideimage: function ($tracker, $mag, showstatus) {
            var specs = $tracker.data('specs');
            $mag.hide();
            if (showstatus) this.hidestatusdiv(specs);
        },

        showstatusdiv: function (specs, fadedur, showdur) {
            clearTimeout(specs.statustimer)
            specs.$statusdiv.css({
                visibility: 'visible'
            }).fadeIn(fadedur)
            specs.statustimer = setTimeout(function () {
                featuredimagezoomer.hidestatusdiv(specs)
            }, showdur)
        },

        hidestatusdiv: function (specs) {
            specs.$statusdiv.stop(true, true).hide()
        },

        getboundary: function (b, val, specs) {
            if (b == "left") {
                var rb = -specs.imagesize.w * specs.curpower + specs.magsize.w
                return (val > 0) ? 0 : (val < rb) ? rb : val
            } else {
                var tb = -specs.imagesize.h * specs.curpower + specs.magsize.h
                return (val > 0) ? 0 : (val < tb) ? tb : val
            }
        },

        moveimage: function ($tracker, $maginner, $cursorshade, e) {
            var specs = $tracker.data('specs'),
                csw = Math.round(specs.magsize.w / specs.curpower),
                csh = Math.round(specs.magsize.h / specs.curpower),
                csb = specs.csborder,
                fiz = this,
                imgcoords = specs.coords,
                pagex = (e.pageX || specs.lastpagex),
                pagey = (e.pageY || specs.lastpagey),
                x = pagex - imgcoords.left,
                y = pagey - imgcoords.top;
            $cursorshade.css({
                visibility: '',
                width: csw,
                height: csh,
                top: Math.min(specs.imagesize.h - csh - csb, Math.max(0, y - (csb + csh) / 2)) + imgcoords.top,
                left: Math.min(specs.imagesize.w - csw - csb, Math.max(0, x - (csb + csw) / 2)) + imgcoords.left
            });
            var newx = -x * specs.curpower + specs.magsize.w / 2
            var newy = -y * specs.curpower + specs.magsize.h / 2
            $maginner.css({
                left: fiz.getboundary('left', newx, specs),
                top: fiz.getboundary('top', newy, specs)
            })
            specs.$statusdiv.css({
                left: pagex - 10,
                top: pagey + 20
            })
            specs.lastpagex = pagex
            specs.lastpagey = pagey
        },

        magnifyimage: function ($tracker, e, zoomrange) {
            if (!e.detail && !e.wheelDelta) {
                e = e.originalEvent;
            }
            var delta = e.detail ? e.detail * (-120) : e.wheelDelta
            var zoomdir = (delta <= -120) ? "out" : "in"
            var specs = $tracker.data('specs')
            var magnifier = specs.magnifier,
                od = specs.imagesize,
                power = specs.curpower

            var newpower = (zoomdir == "in") ? Math.min(power + 1, zoomrange[1]) : Math.max(power - 1, zoomrange[0])
            var nd = [od.w * newpower, od.h * newpower]
            magnifier.$image.css({
                width: nd[0],
                height: nd[1]
            })
            specs.curpower = newpower
            specs.$statusdiv.html('Product Zoom')
            this.showstatusdiv(specs, 0, 500)
            $tracker.trigger('mousemove')
        },

        highestzindex: function ($img) {
            var z = 0,
                $els = $img.parents().add($img),
                elz;
            $els.each(function () {
                elz = $(this).css('zIndex');
                elz = isNaN(elz) ? 0 : +elz;
                z = Math.max(z, elz);
            });
            return z;
        },

        init: function ($img, options) {
            var setting = $.extend({}, this.dsetting, options),
                w = $img.width(),
                h = $img.height(),
                o = $img.offset(),
                fiz = this,
                $tracker, $cursorshade, $statusdiv, $magnifier, lastpage = {
                    pageX: 0,
                    pageY: 0
                },
                basezindex = setting.zIndex || this.highestzindex($img);
            if (h === 0 || w === 0) {
                $(new Image()).load(function () {
                    featuredimagezoomer.init($img, options);
                }).attr('src', $img.attr('src'));
                return;
            }
            $img.css({
                visibility: 'visible'
            });
            setting.largeimage = setting.largeimage || $img.get(0).src;
            $magnifier = $('<div class="magnifyarea" style="position:absolute;z-index:' + basezindex + ';width:' + setting.magnifiersize[0] + 'px;height:' + setting.magnifiersize[1] + 'px;left:-10000px;top:-10000px;visibility:hidden;overflow:hidden;border:1px solid #ccc;" />').append('<div style="position:relative;left:0;top:0;z-index:' + basezindex + ';" />').appendTo(document.body) //create magnifier container

            if (setting.cursorshade) {
                $cursorshade = $('<div class="cursorshade" style="visibility:hidden;position:absolute;background:url(Themes/everything/content/images/zoom-hover.gif);left:0;top:0;z-index:' + basezindex + ';" />').css({
                    border: setting.cursorshadeborder,
                    opacity: setting.cursorshadeopacity,
                    // backgroundColor: setting.cursorshadecolor
                }).appendTo(document.body);
            } else {
                $cursorshade = $('<div />');
            }
            $statusdiv = $('<div class="zoomstatus preloadevt" style="position:absolute;visibility:hidden;left:0;top:0;z-index:' + basezindex + ';" />').html('<img src="' + this.loadinggif + '" />').appendTo(document.body);
            $tracker = $('<div class="zoomtracker" style="cursor:progress;position:absolute;z-index:' + basezindex + ';left:' + o.left + 'px;top:' + o.top + 'px;height:' + h + 'px;width:' + w + 'px;" />').css({
                backgroundImage: (this.isie ? 'url(cannotbe)' : 'none')
            }).appendTo(document.body);
            $(window).bind('load resize', function () {
                var o = $img.offset(),
                    $parent;
                $tracker.css({
                    left: o.left,
                    top: o.top
                });
                if (options.descpos && options.descArea) {
                    $parent = $img.parent();
                    $(options.descArea).css({
                        left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 2,
                        top: $img.height() + o.top
                    });
                }
            });

            function getspecs($maginner, $bigimage) {
                var magsize = {
                    w: $magnifier.width(),
                    h: $magnifier.height()
                }
                var imagesize = {
                    w: w,
                    h: h
                }
                var power = (setting.zoomrange) ? setting.zoomrange[0] : ($bigimage.width() / w).toFixed(5)
                $tracker.data('specs', {
                    $statusdiv: $statusdiv,
                    statustimer: null,
                    magnifier: {
                        $outer: $magnifier,
                        $inner: $maginner,
                        $image: $bigimage
                    },
                    magsize: magsize,
                    magpos: setting.magnifierpos,
                    imagesize: imagesize,
                    curpower: power,
                    coords: getcoords(),
                    csborder: $cursorshade.outerWidth(),
                    lo: setting.leftoffset,
                    ro: setting.rightoffset
                })
            }

            function getcoords() {
                var offset = $tracker.offset()
                return {
                    left: offset.left,
                    top: offset.top
                }
            }

            $tracker.mouseover(function (e) {
                $cursorshade.add($magnifier).add($statusdiv).removeClass('featuredimagezoomerhidden');
                $tracker.data('premouseout', false);
            }).mouseout(function (e) {
                $cursorshade.add($magnifier).add($statusdiv.not('.preloadevt')).addClass('featuredimagezoomerhidden');
                $tracker.data('premouseout', false);
            }).mousemove(function (e) {
                lastpage.pageX = e.pageX;
                lastpage.pageY = e.pageY;
            });

            $tracker.one('mouseover', function (e) {
                var $maginner = $magnifier.find('div:eq(0)')
                var $bigimage = $('<img src="' + setting.largeimage + '"/>').appendTo($maginner)
                var largeloaded = featuredimagezoomer.loaded[$('<a href="' + setting.largeimage + '"></a>').get(0).href];
                var showstatus = setting.zoomrange && setting.zoomrange[1] > setting.zoomrange[0]
                var imgcoords = getcoords()
                if (!largeloaded) {
                    $img.stop(true, true).css({
                        opacity: 0.1
                    })
                    $statusdiv.css({
                        left: imgcoords.left + w / 2 - $statusdiv.width() / 2,
                        top: imgcoords.top + h / 2 - $statusdiv.height() / 2,
                        visibility: 'visible'
                    })
                }
                $bigimage.bind('loadevt', function (event, e) {
                    if (e.type === 'error') {
                        $img.css({
                            opacity: 1
                        }).data('added').remove();
                        var src = $('<a href="' + $bigimage.attr('src') + '"></a>').get(0).href;
                        if (window.console && console.error) {
                            console.error('Cannot find Featured Image Zoomer larger image: ' + src);
                        } else {
                            alert('Cannot find Featured Image Zoomer larger image:\n\n' + src);
                        }
                        return;
                    }
                    featuredimagezoomer.loaded[this.src] = true;
                    $img.css({
                        opacity: 1
                    })
                    $statusdiv.empty().css({
                        border: '1px solid #ddd',
                        background: '#C0C0C0',
                        padding: '4px',
                        font: 'bold 13px Arial',
                        opacity: 0.8
                    }).hide().removeClass('preloadevt');
                    if ($tracker.data('premouseout')) {
                        $statusdiv.addClass('featuredimagezoomerhidden');
                    }
                    if (setting.zoomrange) {
                        var nd = [w * setting.zoomrange[0], h * setting.zoomrange[0]]
                        $bigimage.css({
                            width: nd[0],
                            height: nd[1]
                        })
                    }
                    getspecs($maginner, $bigimage)
                    $magnifier.css({
                        display: 'none',
                        visibility: 'visible'
                    })
                    $tracker.mouseover(function (e) {
                        $tracker.data('specs').coords = getcoords()
                        fiz.showimage($tracker, $magnifier, showstatus)
                    })
                    $tracker.mousemove(function (e) {
                        fiz.moveimage($tracker, $maginner, $cursorshade, e)
                    })
                    if (!$tracker.data('premouseout')) {
                        fiz.showimage($tracker, $magnifier, showstatus);
                        fiz.moveimage($tracker, $maginner, $cursorshade, lastpage);
                    }
                    $tracker.mouseout(function (e) {
                        fiz.hideimage($tracker, $magnifier, showstatus)
                    }).css({
                        cursor: fiz.magnifycursor
                    });
                    if (setting.zoomrange && setting.zoomrange[1] > setting.zoomrange[0]) {
                        $tracker.bind('DOMMouseScroll mousewheel', function (e) {
                            fiz.magnifyimage($tracker, e, setting.zoomrange);
                            e.preventDefault();
                        });
                    } else if (setting.disablewheel) {
                        $tracker.bind('DOMMouseScroll mousewheel', function (e) {
                            e.preventDefault();
                        });
                    }
                })
                if ($bigimage.get(0).complete) {
                    $bigimage.trigger('loadevt', {
                        type: 'load'
                    })
                } else {
                    $bigimage.bind('load error', function (e) {
                        $bigimage.trigger('loadevt', e)
                    })
                }
            })
        },
        iname: (function () {
            var itag = $('<img />'),
                iname = itag.get(0).tagName;
            itag.remove();
            return iname;
        })(),

        loaded: {},

        hashre: /^#/
    });
    $.fn.addimagezoom = function (options) {
        var sel = this.selector,
            $thumbs = $(sel.replace(featuredimagezoomer.hashre, '.') + '.thumbs a');
        options = options || {};
        if (options.multizoom !== null && ($thumbs).size()) {
            $thumbs.addmultizoom($.extend(options, {
                imgObj: sel,
                multizoom: null
            }));
            return this;
        } else if (options.multizoom) {
            $(options.multizoom).addmultizoom($.extend(options, {
                imgObj: sel,
                multizoom: null
            }));
            return this;
        } else if (options.multizoom !== null) {
            return this.each(function () {
                if (this.tagName !== featuredimagezoomer.iname) return true;
                $('<a href="' + this.src + '"></a>').addmultizoom($.extend(options, {
                    imgObj: sel,
                    multizoom: null,
                    notmulti: true
                }));
            });
        }
        return this.each(function () {
            if (this.tagName !== featuredimagezoomer.iname) return true;
            featuredimagezoomer.init($(this), options);
        });
    };
})(jQuery);