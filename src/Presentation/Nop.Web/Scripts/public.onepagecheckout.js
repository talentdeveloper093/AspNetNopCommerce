/*
** nopCommerce one page checkout
*/


var Checkout = {
    loadWaiting: false,
    failureUrl: false,

    init: function (failureUrl) {
        this.loadWaiting = false;
        this.failureUrl = failureUrl;

        Accordion.disallowAccessToNextSections = true;
    },

    ajaxFailure: function () {
        location.href = Checkout.failureUrl;
    },
    
    _disableEnableAll: function (element, isDisabled) {
        var descendants = element.find('*');
        $(descendants).each(function() {
            if (isDisabled) {
                $(this).attr('disabled', 'disabled');
            } else {
                $(this).removeAttr('disabled');
            }
        });

        if (isDisabled) {
                element.attr('disabled', 'disabled');
            } else {
                element.removeAttr('disabled');
            }
    },

    setLoadWaiting: function (step, keepDisabled) {
       
        if (step) {
            if (this.loadWaiting) {
                this.setLoadWaiting(false);
            }
            var container = $('#' + step + '-buttons-container');
            container.addClass('disabled');
            container.css('opacity', '.5');
            this._disableEnableAll(container, true);
            $('#' + step + '-please-wait').show();
        } else {
            if (this.loadWaiting) {
                var container = $('#' + this.loadWaiting + '-buttons-container');
                var isDisabled = (keepDisabled ? true : false);
                if (!isDisabled) {
                    container.removeClass('disabled');
                    container.css('opacity', '1');
                }
                this._disableEnableAll(container, isDisabled);
                $('#' + this.loadWaiting + '-please-wait').hide();
            }
        }
        this.loadWaiting = step;
    },

    gotoSection: function (section) {
        //alert('section',section);
        section = $('#opc-' + section);
        section.addClass('allow');
        Accordion.openSection(section);
    },

    back: function () {
        
        if (this.loadWaiting) return;
        Accordion.openPrevSection(true, true);
       
        if ($('a[href=#step-2]').attr('disabled') !== 'disabled') {
            $('a[href=#step-2]').removeClass('btn-success');
            $('a[href=#step-2]').attr('disabled', 'disabled');
            $('a[href=#step-1]').addClass('btn-success');
            $('a[href=#step-1]').removeAttr('disabled', 'disabled');
            $('#step-2').css('display', 'none')
            $('#step-1').css('display', 'block')
        } else if ($('a[href=#step-3]').attr('disabled') !== 'disabled') {
            $('a[href=#step-3]').removeClass('btn-success');
            $('a[href=#step-3]').attr('disabled', 'disabled');
            $('a[href=#step-2]').addClass('btn-success');
            $('a[href=#step-2]').removeAttr('disabled', 'disabled');
            $('#step-3').css('display', 'none')
            $('#step-2').css('display', 'block')
        } else if ($('a[href=#step-4]').attr('disabled') !== 'disabled') {
            $('a[href=#step-4]').removeClass('btn-success');
            $('a[href=#step-4]').attr('disabled', 'disabled');
            $('a[href=#step-3]').addClass('btn-success');
            $('a[href=#step-3]').removeAttr('disabled', 'disabled');
            $('#step-4').css('display', 'none')
            $('#step-3').css('display', 'block')

        } else if ($('a[href=#step-5]').attr('disabled') !== 'disabled') {
            $('a[href=#step-5]').removeClass('btn-success');
            $('a[href=#step-5]').attr('disabled', 'disabled');
            $('a[href=#step-4]').addClass('btn-success');
            $('a[href=#step-4]').removeAttr('disabled', 'disabled');
            $('#step-5').css('display', 'none')
            $('#step-4').css('display', 'block')
        } else if ($('a[href=#step-6]').attr('disabled') !== 'disabled') {
            $('a[href=#step-6]').removeClass('btn-success');
            $('a[href=#step-6]').attr('disabled', 'disabled');
            $('a[href=#step-5]').addClass('btn-success');
            $('a[href=#step-5]').removeAttr('disabled', 'disabled');
            $('#step-6').css('display', 'none')
            $('#step-5').css('display', 'block')

        }
    },

    setStepResponse: function (response) {
        console.log('response', response);
        console.log('response nextsextion', response.update_section);
        console.log('response allows sections', response.allow_sections);

        console.log('goto_section', response.goto_section)
        console.log('redirect', response.redirect)
        if (response.update_section) {
            $('#checkout-' + response.update_section.name + '-load').html(response.update_section.html);
        }
        if (response.allow_sections) {
            response.allow_sections.each(function (e) {
                $('#opc-' + e).addClass('allow');
            });
        }
        
        //TODO move it to a new method
        if ($("#billing-address-select").length > 0) {
            Billing.newAddress(!$('#billing-address-select').val());
        }
        if ($("#shipping-address-select").length > 0) {
            Shipping.newAddress(!$('#shipping-address-select').val());
        }

        if (response.goto_section == 'confirm_order') {
            $('a[href=#step-4]').removeClass('btn-success');
            $('a[href=#step-4]').attr('disabled', 'disabled');
            $('a[href=#step-5]').addClass('btn-success');
            $('a[href=#step-5]').removeAttr('disabled', 'disabled');
            $('#step-4').css('display', 'none');
            $('#step-5').css('display', 'block');
        }

        //if (response.goto_section == 'confirm_order') {
        //    $('a[href=#step-5]').removeClass('btn-success');
        //    $('a[href=#step-5]').attr('disabled', 'disabled');
        //    $('a[href=#step-6]').addClass('btn-success');
        //    $('a[href=#step-6]').removeAttr('disabled', 'disabled');
        //    $('#step-5').css('display', 'none');
        //    $('#step-6').css('display', 'block');
        //}


        if (response.goto_section) {
            Checkout.gotoSection(response.goto_section);
            return true;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
        }
        return false;
    }
};





var Billing = {
    form: false,
    saveUrl: false,
    disableBillingAddressCheckoutStep: false,

    init: function (form, saveUrl, disableBillingAddressCheckoutStep) {
        this.form = form;
        this.saveUrl = saveUrl;
        this.disableBillingAddressCheckoutStep = disableBillingAddressCheckoutStep;
    },

    newAddress: function (isNew) {
        if (isNew) {
            this.resetSelectedAddress();
            $('#billing-new-address-form').show();
        } else {
            $('#billing-new-address-form').hide();
        }
    },

    resetSelectedAddress: function () {
        var selectElement = $('#billing-address-select');
        if (selectElement) {
            selectElement.val('');
        }
    },

    save: function () {
     

        if (Checkout.loadWaiting != false) return;

        Checkout.setLoadWaiting('billing');
        
        $.ajax({
            cache: false,
            url: this.saveUrl,
            data: $(this.form).serialize(),
            type: 'post',
            success: this.nextStep,
            complete: this.resetLoadWaiting,
            error: Checkout.ajaxFailure
        });
    },

    resetLoadWaiting: function () {
        Checkout.setLoadWaiting(false);
    },

    nextStep: function (response) {
        $('a[href=#step-1]').removeClass('btn-success');
        $('a[href=#step-1]').attr('disabled', 'disabled');
        $('a[href=#step-2]').addClass('btn-success');
        $('a[href=#step-2]').removeAttr('disabled', 'disabled');
        $('#step-1').css('display', 'none');
        $('#step-2').css('display', 'block');
        //ensure that response.wrong_billing_address is set
        //if not set, "true" is the default value
        //alert(response);
        if (typeof response.wrong_billing_address == 'undefined') {
            response.wrong_billing_address = false;
        }
        if (Billing.disableBillingAddressCheckoutStep) {
            if (response.wrong_billing_address) {
                Accordion.showSection('#opc-billing');
            } else {
                Accordion.hideSection('#opc-billing');
            }
        }


        if (response.error) {
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }

        Checkout.setStepResponse(response);
    }
};



var Shipping = {
    form: false,
    saveUrl: false,

    init: function (form, saveUrl) {
        this.form = form;
        this.saveUrl = saveUrl;
    },

    newAddress: function (isNew) {
        if (isNew) {
            this.resetSelectedAddress();
            $('#shipping-new-address-form').show();
        } else {
            $('#shipping-new-address-form').hide();
        }
    },

    togglePickUpInStore: function (pickupInStoreInput) {
        if (pickupInStoreInput.checked) {
            $('#pickup-points-form').show();
            $('#shipping-addresses-form').hide();
        }
        else {
            $('#pickup-points-form').hide();
            $('#shipping-addresses-form').show();
        }
    },

    resetSelectedAddress: function () {
        var selectElement = $('#shipping-address-select');
        if (selectElement) {
            selectElement.val('');
        }
    },

    save: function () {
        if (Checkout.loadWaiting != false) return;

        Checkout.setLoadWaiting('shipping');
        
        $.ajax({
            cache: false,
            url: this.saveUrl,
            data: $(this.form).serialize(),
            type: 'post',
            success: this.nextStep,
            complete: this.resetLoadWaiting,
            error: Checkout.ajaxFailure
        });
    },

    resetLoadWaiting: function () {
        Checkout.setLoadWaiting(false);
    },

    nextStep: function (response) {
        if (response.error) {
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }

        Checkout.setStepResponse(response);
    }
};



var ShippingMethod = {
    form: false,
    saveUrl: false,
     
    init: function (form, saveUrl) {
        this.form = form;
        this.saveUrl = saveUrl;
    },

    validate: function() {
        var methods = document.getElementsByName('shippingoption');
        if (methods.length==0) {
            alert('Your order cannot be completed at this time as there is no shipping methods available for it. Please make necessary changes in your shipping address.');
            return false;
        }

        for (var i = 0; i< methods.length; i++) {
            if (methods[i].checked) {
                return true;
            }
        }
        alert('Please specify shipping method.');
        return false;
    },
    
    save: function () {
        if (Checkout.loadWaiting != false) return;
        
        if (this.validate()) {
            Checkout.setLoadWaiting('shipping-method');
        
            $.ajax({
                cache: false,
                url: this.saveUrl,
                data: $(this.form).serialize(),
                type: 'post',
                success: this.nextStep,
                complete: this.resetLoadWaiting,
                error: Checkout.ajaxFailure
            });
        }
    },

    resetLoadWaiting: function () {
        Checkout.setLoadWaiting(false);
    },

    nextStep: function (response) {
       
        $('a[href=#step-2]').removeClass('btn-success');
        $('a[href=#step-2]').attr('disabled', 'disabled');
        $('a[href=#step-3]').addClass('btn-success');
        $('a[href=#step-3]').removeAttr('disabled', 'disabled');
        $('#step-2').css('display', 'none');
        $('#step-3').css('display', 'block');
        if (response.error) {
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }

        Checkout.setStepResponse(response);
    }
};



var PaymentMethod = {
    form: false,
    saveUrl: false,

    init: function (form, saveUrl) {
        this.form = form;
        this.saveUrl = saveUrl;
    },

    toggleUseRewardPoints: function (useRewardPointsInput) {
        if (useRewardPointsInput.checked) {
            $('#payment-method-block').hide();
        }
        else {
            $('#payment-method-block').show();
        }
    },

    validate: function () {
        var methods = document.getElementsByName('paymentmethod');
        if (methods.length == 0) {
            alert('Your order cannot be completed at this time as there is no payment methods available for it.');
            return false;
        }
        
        for (var i = 0; i < methods.length; i++) {
            if (methods[i].checked) {
                return true;
            }
        }
        alert('Please specify payment method.');
        return false;
    },
    
    save: function () {


        //alert(elem)
        if (Checkout.loadWaiting != false) return;
        
        if (this.validate()) {
            Checkout.setLoadWaiting('payment-method');
            $.ajax({
                cache: false,
                url: this.saveUrl,
                data: $(this.form).serialize(),
                type: 'post',
                success: this.nextStep,
                complete: this.resetLoadWaiting,
                error: Checkout.ajaxFailure
            });
        }
    },

    resetLoadWaiting: function () {
        Checkout.setLoadWaiting(false);
    },

    nextStep: function (response) {
        $('a[href=#step-3]').removeClass('btn-success');
        $('a[href=#step-3]').attr('disabled', 'disabled');
        $('a[href=#step-4]').addClass('btn-success');
        $('a[href=#step-4]').removeAttr('disabled', 'disabled');
        $('#step-3').css('display', 'none');
        $('#step-4').css('display', 'block');
        if (response.error) {
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }

        Checkout.setStepResponse(response);
    }
};



var PaymentInfo = {
    form: false,
    saveUrl: false,

    init: function (form, saveUrl) {
        this.form = form;
        this.saveUrl = saveUrl;
    },

    save: function () {
        if (Checkout.loadWaiting != false) return;
        
        Checkout.setLoadWaiting('payment-info');
        $.ajax({
            cache: false,
            url: this.saveUrl,
            data: $(this.form).serialize(),
            type: 'post',
            success: this.nextStep,
            complete: this.resetLoadWaiting,
            error: Checkout.ajaxFailure
        });
    },

    resetLoadWaiting: function () {
        Checkout.setLoadWaiting(false);
    },

    nextStep: function (response) {
       
     
        if (response.error) {
            
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }

        Checkout.setStepResponse(response);
    }
};



var ConfirmOrder = {
    form: false,
    saveUrl: false,
    isSuccess: false,

    init: function (saveUrl, successUrl) {
        this.saveUrl = saveUrl;
        this.successUrl = successUrl;
    },

    save: function () {
        if (Checkout.loadWaiting != false) return;
        
        //terms of service
        var termOfServiceOk = true;
        if ($('#termsofservice').length > 0) {
            //terms of service element exists
            if (!$('#termsofservice').is(':checked')) {
                $("#terms-of-service-warning-box").dialog();
                termOfServiceOk = false;
            } else {
                termOfServiceOk = true;
            }
        }
        if (termOfServiceOk) {
            Checkout.setLoadWaiting('confirm-order');
            $.ajax({
                cache: false,
                url: this.saveUrl,
                type: 'post',
                success: this.nextStep,
                complete: this.resetLoadWaiting,
                error: Checkout.ajaxFailure
            });
        } else {
            return false;
        }
    },
    
    resetLoadWaiting: function (transport) {
        Checkout.setLoadWaiting(false, ConfirmOrder.isSuccess);
    },

    nextStep: function (response) {
        $('a[href=#step-5]').removeClass('btn-success');
        $('a[href=#step-5]').attr('disabled', 'disabled');
        $('a[href=#step-6]').addClass('btn-success');
        $('a[href=#step-6]').removeAttr('disabled', 'disabled');
        $('#step-5').css('display', 'none');
        $('#step-6').css('display', 'block');
        if (response.error) {
            if ((typeof response.message) == 'string') {
                alert(response.message);
            } else {
                alert(response.message.join("\n"));
            }

            return false;
        }
        
        if (response.redirect) {
            ConfirmOrder.isSuccess = true;
            location.href = response.redirect;
            return;
        }
        if (response.success) {
            ConfirmOrder.isSuccess = true;
            window.location = ConfirmOrder.successUrl;
        }

        Checkout.setStepResponse(response);
    }
};