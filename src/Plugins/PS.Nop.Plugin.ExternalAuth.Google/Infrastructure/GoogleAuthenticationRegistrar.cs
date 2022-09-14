using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Nop.Core.Infrastructure;
using Nop.Services.Authentication.External;
using System.Security.Claims;

namespace PS.Nop.Plugin.ExternalAuth.Google.Infrastructure
{

    public class GoogleAuthenticationRegistrar : IExternalAuthenticationRegistrar
    {
        public void Configure(AuthenticationBuilder builder)
        {
            builder.AddGoogle(options =>
            {
                var settings = EngineContext.Current.Resolve<GoogleExternalAuthSettings>();
                options.ClientId = settings.ClientKeyIdentifier;
                options.ClientSecret = settings.ClientSecret;
                options.SaveTokens = true;
            });
        }
    }
}