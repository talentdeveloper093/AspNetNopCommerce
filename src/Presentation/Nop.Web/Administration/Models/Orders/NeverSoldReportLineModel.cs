using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;
using System;

namespace Nop.Admin.Models.Orders
{
    public partial class NeverSoldReportLineModel : BaseNopModel
    {
        public int ProductId { get; set; }
        [NopResourceDisplayName("Admin.SalesReport.NeverSold.Fields.Name")]
        public string ProductName { get; set; }

        public string MessageFromBuyer { get; set; }

        public string OfferRequestedBy { get; set; }

        public string OfferedPrice { get; set; }

        public string OfferStatus { get; set; }

        public string Action { get; set; }

        public DateTime CreatedDate { get; set; }

        public string ActualPrice { get; set; }

        public string Categories { get; set; }
    
    }
}