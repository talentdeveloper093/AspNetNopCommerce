using Microsoft.AspNetCore.Mvc;
using Nop.Web.Framework.Components;
using PS.Nop.Plugin.ExternalAuth.Google;

namespace PS.Nop.Plugin.ExternalAuth.Google.Components
{
    [ViewComponent(Name = GoogleExternalAuthConstants.ViewComponentName)]
    public class GoogleAuthenticationViewComponent : NopViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View("~/Plugins/PS.ExternalAuth.Google/Views/PublicInfo.cshtml");
        }
    }
}