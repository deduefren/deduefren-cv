using System;
using System.Collections.Generic;
using System.Text;

namespace api.Services
{
    public class ConfigurationService : IConfigurationService
    {
        public string ContactMailDestination { get; } = System.Environment.GetEnvironmentVariable("ContactMailDestination");

        public string ContactMailSender { get; } = System.Environment.GetEnvironmentVariable("ContactMailSender");
    }
}
