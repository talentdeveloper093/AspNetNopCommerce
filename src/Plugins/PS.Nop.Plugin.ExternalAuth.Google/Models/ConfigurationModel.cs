using Nop.Web.Framework.Mvc.ModelBinding;
using Nop.Web.Framework.Models;

namespace PS.Nop.Plugin.ExternalAuth.Google.Models
{
    public class ConfigurationModel : BaseNopModel
    {
        [NopResourceDisplayName("PS.Plugins.ExternalAuth.Google.ClientKeyIdentifier")]
        public string ClientId { get; set; }

        [NopResourceDisplayName("PS.Plugins.ExternalAuth.Google.ClientSecret")]
        public string ClientSecret { get; set; }
    }
}