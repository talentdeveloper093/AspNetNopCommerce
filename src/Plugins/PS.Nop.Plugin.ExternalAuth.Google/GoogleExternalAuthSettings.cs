using Nop.Core.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace PS.Nop.Plugin.ExternalAuth.Google
{
    public class GoogleExternalAuthSettings : ISettings
    {
        /// <summary>
        /// Gets or sets OAuth2 client identifier
        /// </summary>
        public string ClientKeyIdentifier { get; set; }

        /// <summary>
        /// Gets or sets OAuth2 client secret
        /// </summary>
        public string ClientSecret { get; set; }
    }
}