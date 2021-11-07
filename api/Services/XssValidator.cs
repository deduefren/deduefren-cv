using api.Exceptions;
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
            encoded = AllowSpanishTildes(encoded);
            if (value != encoded)

            {
                throw new XssException("Forbidden input. The following characters are not allowed: &, <, >, \", '");
            }
        }

        private static string AllowSpanishTildes(string encoded)
        {
            return encoded
                .Replace("&#xE1;", "á")
                .Replace("&#xE9;", "é")
                .Replace("&#xED;", "í")
                .Replace("&#xF3;", "ó")
                .Replace("&#xFA;", "ú");
        }
    }
}
