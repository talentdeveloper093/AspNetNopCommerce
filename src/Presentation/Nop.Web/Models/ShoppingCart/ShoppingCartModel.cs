#region Assembly Nop.Web, Version=3.9.0.0, Culture=neutral, PublicKeyToken=null
// C:\Users\pc\Desktop\nopcommerce-release\Bin\Nop.Web.dll
#endregion

using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;
using Nop.Core.Domain.Catalog;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Common;
using Nop.Web.Models.Media;

namespace Nop.Web.Models.ShoppingCart
{
    public class ShoppingCartModel : BaseNopModel
    {
        public ShoppingCartModel()
        {
            Items = new List<ShoppingCartItemModel>();
            Warnings = new List<string>();
            DiscountBox = new DiscountBoxModel();
            GiftCardBox = new GiftCardBoxModel();
            CheckoutAttributes = new List<CheckoutAttributeModel>();
            OrderReviewData = new OrderReviewDataModel();
            ButtonPaymentMethodRouteValues = new List<RouteValueDictionary>();
        }

        public bool HideCheckoutButton { get; set; }
        public IList<RouteValueDictionary> ButtonPaymentMethodRouteValues { get; set; }
        public IList<string> ButtonPaymentMethodControllerNames { get; set; }
        public IList<string> ButtonPaymentMethodActionNames { get; set; }
        public OrderReviewDataModel OrderReviewData { get; set; }
        public GiftCardBoxModel GiftCardBox { get; set; }
        public DiscountBoxModel DiscountBox { get; set; }
        public bool TermsOfServiceOnOrderConfirmPage { get; set; }
        public bool TermsOfServiceOnShoppingCartPage { get; set; }
        public EstimateShippingModel EstimateShipping { get; set; }
        public string MinOrderSubtotalWarning { get; set; }
        public IList<string> Warnings { get; set; }
        public IList<CheckoutAttributeModel> CheckoutAttributes { get; set; }
        public string CheckoutAttributeInfo { get; set; }
        public IList<ShoppingCartItemModel> Items { get; set; }
        public bool IsEditable { get; set; }
        public bool ShowProductImages { get; set; }
        public bool ShowSku { get; set; }
        public bool OnePageCheckoutEnabled { get; set; }
        public bool DisplayTaxShippingInfo { get; set; }

        public class GiftCardBoxModel : BaseNopModel
        {
            public GiftCardBoxModel() { }

            public bool Display { get; set; }
            public string Message { get; set; }
            public bool IsApplied { get; set; }
        }
        public class ShoppingCartItemModel : BaseNopEntityModel
        {
            public ShoppingCartItemModel()
            {

                AllowedQuantities = new List<SelectListItem>();
                Picture = new PictureModel();
                Warnings = new List<string>();

            }

            public bool AllowItemEditing { get; set; }
            public string RentalInfo { get; set; }
            public string RecurringInfo { get; set; }
            public string AttributeInfo { get; set; }
            public List<SelectListItem> AllowedQuantities { get; set; }
            public int Quantity { get; set; }
            public int? MaximumDiscountedQty { get; set; }
            public string Discount { get; set; }
            public string SubTotal { get; set; }
            public string UnitPrice { get; set; }
            public string ProductSeName { get; set; }
            public string ProductName { get; set; }
            public int ProductId { get; set; }
            public PictureModel Picture { get; set; }
            public string Sku { get; set; }
            public bool DisableRemoval { get; set; }
            public IList<string> Warnings { get; set; }
        }
        public class CheckoutAttributeModel : BaseNopEntityModel
        {
            public CheckoutAttributeModel()
            {
                AllowedFileExtensions = new List<string>();
                Values = new List<CheckoutAttributeValueModel>();
            }

            public string Name { get; set; }
            public string DefaultValue { get; set; }
            public string TextPrompt { get; set; }
            public bool IsRequired { get; set; }
            public int? SelectedDay { get; set; }
            public int? SelectedMonth { get; set; }
            public int? SelectedYear { get; set; }
            public IList<string> AllowedFileExtensions { get; set; }
            public AttributeControlType AttributeControlType { get; set; }
            public IList<CheckoutAttributeValueModel> Values { get; set; }
        }
        public class CheckoutAttributeValueModel : BaseNopEntityModel
        {
            public CheckoutAttributeValueModel() { }

            public string Name { get; set; }
            public string ColorSquaresRgb { get; set; }
            public string PriceAdjustment { get; set; }
            public bool IsPreSelected { get; set; }
        }
        public class DiscountBoxModel : BaseNopModel
        {
            public DiscountBoxModel()
            {

                AppliedDiscountsWithCodes = new List<DiscountInfoModel>();
                Messages = new List<string>();
            }

            public List<DiscountInfoModel> AppliedDiscountsWithCodes { get; set; }
            public bool Display { get; set; }
            public List<string> Messages { get; set; }
            public bool IsApplied { get; set; }

            public class DiscountInfoModel : BaseNopEntityModel
            {
                public DiscountInfoModel() { }

                public string CouponCode { get; set; }
            }
        }
        public class OrderReviewDataModel : BaseNopModel
        {
            public OrderReviewDataModel() {

                BillingAddress = new AddressModel();
                ShippingAddress = new AddressModel();
                PickupAddress = new AddressModel();
                CustomValues = new Dictionary<string, object>();
            }

            public bool Display { get; set; }
            public AddressModel BillingAddress { get; set; }
            public bool IsShippable { get; set; }
            public AddressModel ShippingAddress { get; set; }
            public bool SelectedPickUpInStore { get; set; }
            public AddressModel PickupAddress { get; set; }
            public string ShippingMethod { get; set; }
            public string PaymentMethod { get; set; }
            public Dictionary<string, object> CustomValues { get; set; }
        }
    }
}