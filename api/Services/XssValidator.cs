using api.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Encodings.Web;

namespace api.Services
{
    public class XssValidator
    {
        public static void ThrowIfForbiddenInput(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return;
            }

            var encoded = HtmlEncoder.Default.Encode(value);
            if (value != encoded)
            {
                throw new XssException("Forbidden input. The following characters are not allowed: &, <, >, \", '");
            }
        }
    }
}
