using System;
using System.Collections.Generic;
using Nop.Web.Framework.Mvc;

namespace Nop.Web.Models.Customer
{
    public partial class CustomerDownloadableProductsModel : BaseNopModel
    {
        public CustomerDownloadableProductsModel()
        {
            Items = new List<DownloadableProductsModel>();
        }

        public IList<DownloadableProductsModel> Items { get; set; }

        #region Nested classes
        public partial class DownloadableProductsModel : BaseNopModel
        {
            public Guid OrderItemGuid { get; set; }

            public int OrderId { get; set; }
            public string CustomOrderNumber { get; set; }

            public int ProductId { get; set; }
            public string ProductName { get; set; }
            public string ProductSeName { get; set; }
            public string ProductAttributes { get; set; }

            public int DownloadId { get; set; }
            public int LicenseId { get; set; }

            public DateTime CreatedOn { get; set; }
        }
        #endregion
    }

    public partial class UserAgreementModel : BaseNopModel
    {
        public Guid OrderItemGuid { get; set; }
        public string UserAgreementText { get; set; }
    }

    public partial class CounterOffersModel
    {
        public CounterOffersModel()
        {
            Items = new List<CounterOffersModel>();
        }

        public IList<CounterOffersModel> Items { get; set; }

    }

    public partial class CounterOffersModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OfferStatus { get; set; }

        public string MessageToSeller { get; set; }

        public decimal Price { get; set; }

        public string ActualPrice { get; set; }

        public int? OriginalProductid { get; set; }
    }

}