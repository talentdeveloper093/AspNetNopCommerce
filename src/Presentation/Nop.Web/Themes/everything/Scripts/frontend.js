jQuery(document).ready(function ($) {
    "use strict";

    // Inline style for mega menu/vertical menu
    $('.sub-menu.zanmenu').each(function () {
        var $this           = $(this);
        var menu_item_style = $this.attr('data-style');

        if ($.trim(menu_item_style) != '') {
            if (!$('#zmb-menu-style-inline-css').length) {
                $('head').append('<style id="zmb-menu-style-inline-css" type="text/css"></style>');
            }

            $('#zmb-menu-style-inline-css').append(menu_item_style);
        }

    });

    // Mini Cart
    $('.zmb-menu .zmb-custom-item').each(function () {

        var thisMenuItem = $(this);

        // Is mini cart item
        if (zmb['has_nopcommerce'] == 'yes' && thisMenuItem.is('.zmb-cart')) {
            var total_cart_items = parseInt(zmb['cart_count']);
            var cart_icon_class  = 'icon-basket zmb-cart-icon';
            if (total_cart_items > 0) {
                cart_icon_class = 'icon-basket-loaded zmb-cart-icon';
            }
            thisMenuItem.addClass('dropdown menu-item-has-children');
            thisMenuItem.html('<a href="' + zmb['cart_url'] + '" class="zmb-mini-cart-url"><span class="' + cart_icon_class + '"><span class="zmb-mini-cart-count">' + total_cart_items + '</span></span></a>'); // icon-basket-loaded
            thisMenuItem.append('<div class="sub-menu"><div class="zanmenu-inner"><div class="zanmenu-content"><div class="zmb-mini-cart-wrap"></div></div></div></div>');
            thisMenuItem.find('> .sub-menu > .zanmenu-inner .zmb-mini-cart-wrap').html('<div class="widget_shopping_cart_content">' + zmb['mini_cart_html'] + '</div>');
        }

    });

    // Update cart
    $(document).on('added_to_cart', function (event, fragments, cart_hash, button) {

        $('.zmb-mini-cart-wrap').html(fragments['div.widget_shopping_cart_content']);
        $('.zmb-mini-cart-count').html(fragments['zmb_cart_count']);

    });

    // Sliding content
    if ($.trim(zmb['sliding_btn_selector']) != '') {
        $(document).on('click', zmb['sliding_btn_selector'], function (e) {
            $('.zmb-sliding-content-wrap').toggleClass('active');
            if ($('.zmb-sliding-content-wrap').is('.active')) {
                $('body').addClass('zmb-sliding-content-is-opened');
            }
            else {
                $('body').removeClass('zmb-sliding-content-is-opened');
            }
            e.preventDefault();
            return false;
        });
    }

    // Fire show sliding content
    if ($.trim(zmb['show_sliding_on']) != '') {
        $(document).on(zmb['show_sliding_on'], function () {
            $('.zmb-sliding-content-wrap').addClass('active');
            $('body').addClass('zmb-sliding-content-is-opened');
        });
    }

    // Sliding content css
    $('.zmb-sliding-content-wrap').each(function () {
        var $this      = $(this);
        var this_width = $this.attr('data-width');
        $this.css({
            'right' : '-' + this_width + 'px'
        });
    });

    // Close sliding content
    $(document).on('click', '.zmb-close-sliding', function (e) {
        zmb_close_sliding_content();
        e.preventDefault();
        return false;
    });

    function zmb_close_sliding_content() {
        if ($('.zmb-sliding-content-wrap').length) {
            $('.zmb-sliding-content-wrap').removeClass('active');
        }
        $('body').removeClass('zmb-sliding-content-is-opened');
    }

    // Close sliding content when click outside
    $(document).on('click', 'body.zmb-sliding-content-is-opened', function (e) {

        var target = $(e.target);

        if (!target.is('.zmb-sliding-content-wrap') && !target.closest('.zmb-sliding-content-wrap').length) {
            $('.zmb-sliding-content-wrap').removeClass('active');
            $('body').removeClass('zmb-sliding-content-is-opened');
            e.preventDefault();
        }

    });

    // Show/hide menu mobile
    $(document).on('click', '.zmb-toggle-menu-mobile', function (e) {
        var $this        = $(this);
        var target_id    = $this.attr('href');
        var zmbCloneWrap = $('.zmb-clone-wrap');

        zmbCloneWrap.toggleClass('active');

        if (zmbCloneWrap.is('.active')) {
            $(target_id).addClass('zmb-panel-opened').removeClass('zmb-hidden');
            $('body').addClass('zmb-is-opened');
        }
        else {
            $('body').removeClass('zmb-is-opened');
        }

        e.preventDefault();
    });

    // Open next panel
    $(document).on('click', '.zmb-next-panel', function (e) {
        var $this     = $(this);
        var thisItem  = $this.closest('.menu-item');
        var thisPanel = $this.closest('.zmb-panel');
        var target_id = $this.attr('href');

        if ($(target_id).length) {
            thisPanel.addClass('zmb-sub-opened');
            $(target_id).addClass('zmb-panel-opened').removeClass('zmb-hidden').attr('data-parent-panel', thisPanel.attr('id'));
            // Insert current panel title
            var item_title = thisItem.find('.zmb-item-title').attr('data-title');

            if (typeof item_title != 'undefined' && typeof item_title != false) {
                if (!$('.zmb-panels-actions-wrap .zmb-current-panel-title').length) {
                    $('.zmb-panels-actions-wrap').prepend('<span class="zmb-current-panel-title"></span>');
                }
                $('.zmb-panels-actions-wrap .zmb-current-panel-title').html(item_title);
            }
            else {
                $('.zmb-panels-actions-wrap .zmb-current-panel-title').remove();
            }

            // Back to previous panel
            $('.zmb-panels-actions-wrap .zmb-prev-panel').remove();
            $('.zmb-panels-actions-wrap').prepend('<a class="zmb-prev-panel" href="#' + thisPanel.attr('id') + '" data-cur-panel="' + target_id + '" data-target="#' + thisPanel.attr('id') + '"></a>');
        }

        e.preventDefault();
    });

    // Go to previous panel
    $(document).on('click', '.zmb-prev-panel', function (e) {
        var $this        = $(this);
        var cur_panel_id = $this.attr('data-cur-panel');
        var target_id    = $this.attr('href');

        $(cur_panel_id).removeClass('zmb-panel-opened').addClass('zmb-hidden');
        $(target_id).addClass('zmb-panel-opened').removeClass('zmb-sub-opened');

        // Set new back button
        var new_parent_panel_id = $(target_id).attr('data-parent-panel');
        if (typeof new_parent_panel_id == 'undefined' || typeof new_parent_panel_id == false) {
            $('.zmb-panels-actions-wrap .zmb-prev-panel').remove();
            $('.zmb-panels-actions-wrap .zmb-current-panel-title').remove();
        }
        else {
            $('.zmb-panels-actions-wrap .zmb-prev-panel').attr('href', '#' + new_parent_panel_id).attr('data-cur-panel', target_id).attr('data-target', '#' + new_parent_panel_id);
            // Insert new panel title
            var item_title = $('#' + new_parent_panel_id).find('.zmb-next-panel[data-target="' + target_id + '"]').closest('.menu-item').find('.zmb-item-title').attr('data-title');

            if (typeof item_title != 'undefined' && typeof item_title != false) {
                if (!$('.zmb-panels-actions-wrap .zmb-current-panel-title').length) {
                    $('.zmb-panels-actions-wrap').prepend('<span class="zmb-current-panel-title"></span>');
                }
                $('.zmb-panels-actions-wrap .zmb-current-panel-title').html(item_title);
            }
            else {
                $('.zmb-panels-actions-wrap .zmb-current-panel-title').remove();
            }
        }

        e.preventDefault();

    });

    // Close mobile panels
    $(document).on('click', '.zmb-close-panels', function (e) {
        var $this = $(this);
        $this.closest('.zmb-clone-wrap').removeClass('active');
        if (!$('.zmb-clone-wrap.active').length) {
            $('body').removeClass('zmb-is-opened');
            $('.zmb-panel').removeClass('zmb-panel-opened zmb-sub-opened');
            $('.zmb-panels-actions-wrap .zmb-current-panel-title').remove();
        }
        else {

        }
        e.preventDefault();
    });

    // Close mobile panels when click outside
    $(document).on('click', 'body.zmb-is-opened', function (e) {

        var target = $(e.target);

        if (!target.is('.zmb-clone-wrap') && !target.closest('.zmb-clone-wrap').length && !target.is('.zmb-prev-panel')) {
            $('.zmb-clone-wrap').removeClass('active');
            $('body').removeClass('zmb-is-opened');
            $('.zmb-panel').removeClass('zmb-panel-opened zmb-sub-opened');
            $('.zmb-panels-actions-wrap .zmb-current-panel-title').remove();
            e.preventDefault();
        }

    });

    // Clone all Zan Menus for mobile
    function zmb_clone_all_zan_menus() {
        if (!$('.zmb-clone-wrap').length) {
            $('body').prepend('<div class="zmb-clone-wrap">' +
                '<div class="zmb-panels-actions-wrap"><a class="zmb-close-btn zmb-close-panels" href="#">x</a></div>' +
                '<div class="zmb-panels"></div>' +
                '</div>');
        }

        var i                = 0;
        var panels_html_args = Array();
        $('.zmb-wrap').each(function () {
            var $this              = $(this);
            var thisMenu           = $this.find('.zmb-menu');
            var this_menu_id       = thisMenu.attr('id');
            var this_menu_clone_id = 'zmb-clone-' + this_menu_id;

            if (!$('#' + this_menu_clone_id).length) {
                var thisClone = $this.clone(true); // Clone Wrap
                thisClone.find('.menu-item').addClass('clone-menu-item');
                thisClone.find('[id]').each(function () {
                    // Change all tab links with href = this id
                    thisClone.find('.vc_tta-panel-heading a[href="#' + $(this).attr('id') + '"]').attr('href', '#' + zmb_add_string_prefix($(this).attr('id'), 'zmb-clone-'));
                    $(this).attr('id', zmb_add_string_prefix($(this).attr('id'), 'zmb-clone-'));
                });
                thisClone.find('.zmb-menu').addClass('zmb-menu-clone');

                // Create main panel if not exists
                if (!$('.zmb-clone-wrap .zmb-panels #zmb-panel-' + this_menu_id).length) {
                    $('.zmb-clone-wrap .zmb-panels').append('<div id="zmb-panel-' + this_menu_id + '" class="zmb-panel zmb-main-panel zmb-hidden"></div>');
                }
                var thisMainPanel = $('.zmb-clone-wrap .zmb-panels #zmb-panel-' + this_menu_id);
                thisMainPanel.html(thisClone.html());

                zmb_insert_children_panels_html_by_elem(thisMainPanel, i);

            }

        });
    }

    zmb_clone_all_zan_menus();

    // i: For next nav target
    function zmb_insert_children_panels_html_by_elem($elem, i) {

        if ($elem.find('.menu-item-has-children').length) {
            $elem.find('.menu-item-has-children').each(function () {
                var thisChildItem = $(this);
                zmb_insert_children_panels_html_by_elem(thisChildItem, i);

                var next_nav_target = 'zmb-panel-' + i;

                // Make sure there is no duplicate panel id
                while ($('#' + next_nav_target).length) {
                    i++;
                    next_nav_target = 'zmb-panel-' + i;
                }

                // Insert Next Nav
                thisChildItem.prepend('<a class="zmb-next-panel" href="#' + next_nav_target + '" data-target="#' + next_nav_target + '"></a>');

                // Get sub menu html
                var submenu_html = $('<div>').append(thisChildItem.find('> .sub-menu').clone()).html();
                thisChildItem.find('> .sub-menu').remove();

                $('.zmb-clone-wrap .zmb-panels').append('<div id="' + next_nav_target + '" class="zmb-panel zmb-sub-panel zmb-hidden">' + submenu_html + '</div>');

            });
        }

    }


    function zmb_add_string_prefix(str, prefix) {
        return prefix + str;
    }

    // Insert Mobile Icon For Menu
    $('.zmb-wrap').each(function () {
        var $this = $(this);
        if (!$this.find('> .zmb-toggle-menu-mobile').length) {
            var target_id = 'zmb-panel-' + $this.find('> .zmb-menu').attr('id');
            $this.prepend('<a class="zmb-toggle-menu-mobile" href="#' + target_id + '">' +
                '<span class="icon">' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
                '</span>' +
                '</a>');
        }
    });


    // Set all Vertical menu data base width
    if (!$.isEmptyObject(zmb['vertical_menu_info'])) {

        $.each(zmb['vertical_menu_info'], function (vertical_menu_location, vertical_menu_info) {
            if ($(vertical_menu_info['menu_wrap_selector'] + '.zmb-is-vertical-menu').length) {
                var verticalMenuWrap = $(vertical_menu_info['menu_wrap_selector'] + '.zmb-is-vertical-menu');
                verticalMenuWrap.attr('data-base-width-type', vertical_menu_info['base_width_type']);
                verticalMenuWrap.attr('data-closest-selector', vertical_menu_info['closest_selector']);
                verticalMenuWrap.attr('data-lv0-width', vertical_menu_info['lv0_width']);
                verticalMenuWrap.attr('data-base-width', vertical_menu_info['base_width']);
                verticalMenuWrap.attr('data-break-point', vertical_menu_info['break_point']);
            }
        });
    }

    function zmb_calculate_vertical_menu_width() {
        $('.zmb-wrap.zmb-is-vertical-menu').each(function () {
            var thisMenuWrap         = $(this);
            var base_width_type      = thisMenuWrap.attr('data-base-width-type');
            var lv0_width            = parseInt(thisMenuWrap.attr('data-lv0-width'));
            var base_width           = parseInt(thisMenuWrap.attr('data-base-width'));
            var left_or_right_offset = 0;

            if (base_width_type == 'closest') {
                var closest_selector = thisMenuWrap.attr('data-closest-selector');
                if (!thisMenuWrap.closest(closest_selector).length) {
                    closest_selector = 'body';
                }
                base_width = $(closest_selector).innerWidth();
            }

            if (base_width < lv0_width + left_or_right_offset) {
                base_width = lv0_width + left_or_right_offset;
            }

            thisMenuWrap.css({
                'width' : lv0_width + 'px'
            });
            thisMenuWrap.find('.sub-menu.zanmenu').css({
                'width' : (base_width - lv0_width - left_or_right_offset) + 'px',
                'max-width' : (base_width - lv0_width - left_or_right_offset) + 'px'
            });

        });
    }

    zmb_calculate_vertical_menu_width();
    // Menu width
    $('.zmb-wrap .zmb-menu .sub-menu').each(function () {
        var $this      = $(this);
        var thisWrap   = $this.closest('.zmb-wrap');
        var this_width = $this.attr('data-width');

        if (typeof this_width != 'undefined' && typeof this_width != false) {
            this_width = parseInt(this_width);
            if (!isNaN(this_width)) {
                $this.css({
                    'width' : this_width + 'px'
                });
                if (!thisWrap.is('.zmb-is-vertical-menu') && !$this.is('.zanmenu-has-parent')) {
                    $this.css({
                        'max-width' : '100%'
                    });
                }
            }
        }
    });

    // Window Scroll
   // $(window).scroll(function () {
     //   zmb_stick_menu();
   // });

    // Submit Mailchimp via ajax
    $(document).on('submit', 'form[name="zmb_news_letter"]', function (e) {

        var $this    = $(this);
        var thisWrap = $this.closest('.newsletter-form-wrap');

        if ($this.hasClass('processing')) {
            return false;
        }

        var api_key         = $this.find('input[name="api_key"]').val();
        var list_id         = $this.find('input[name="list_id"]').val();
        var success_message = $this.find('input[name="success_message"]').val();
        var email           = $this.find('input[name="email"]').val();

        var data = {
            action : 'zmb_core_submit_mailchimp_via_ajax',
            api_key : api_key,
            list_id : list_id,
            success_message : success_message,
            email : email
        };

        $this.addClass('processing');
        thisWrap.find('.return-message').remove();

        $.post(zmb_ajaxurl, data, function (response) {

            if ($.trim(response['success']) == 'yes') {
                $this.after('<p class="return-message bg-success">' + response['message'] + '</p>');
                $this.find('input[name="email"]').val('');
            }
            else {
                $this.after('<p class="return-message bg-danger">' + response['message'] + '</p>');
            }

            $this.removeClass('processing');

        });

        e.preventDefault();
        return false;

    });

    // Load
    $(window).load(function () {
        zmb_calculate_vertical_menu_width();
    });

    // Resize
    $(window).resize(function () {
        // Close all opened menu
        $('.zmb-clone-wrap').removeClass('active');
        $('body').removeClass('zmb-is-opened');
        // Re-calculate all vertical menus base width
        zmb_calculate_vertical_menu_width();
        // Close sliding content
        zmb_close_sliding_content();
    });

});