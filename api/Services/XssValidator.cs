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
            encoded = AllowedChars(encoded);
            if (value != encoded)

            {
                throw new XssException("Forbidden input. The following characters are not allowed: &, <, >, \", '");
            }
        }

        public static string AllowedChars(string encoded)
        {
            return encoded
                .Replace("&#xE1;", "á")
                .Replace("&#xE9;", "é")
                .Replace("&#xED;", "í")
                .Replace("&#xF3;", "ó")
                .Replace("&#xFA;", "ú")
                .Replace("&#xC1;", "Á")
                .Replace("&#xC9;", "É")
                .Replace("&#xCD;", "Í")
                .Replace("&#xD3;", "Ó")
                .Replace("&#xDA;", "Ú")
                .Replace("&#xB4;", "´")

                .Replace("&#xE2;", "â")
                .Replace("&#xEA;", "ê")
                .Replace("&#xEE;", "î")
                .Replace("&#xF4;", "ô")
                .Replace("&#xFB;", "û")
                .Replace("&#xC2;", "Â")
                .Replace("&#xCA;", "Ê")
                .Replace("&#xCE;", "Î")
                .Replace("&#xD4;", "Ô")
                .Replace("&#xDB;", "Û")

                .Replace("&#xE0;", "à")
                .Replace("&#xE8;", "è")
                .Replace("&#xEC;", "ì")
                .Replace("&#xF2;", "ò")
                .Replace("&#xF9;", "ù")
                .Replace("&#xC0;", "À")
                .Replace("&#xC8;", "È")
                .Replace("&#xCC;", "Ì")
                .Replace("&#xD2;", "Ò")
                .Replace("&#xD9;", "Ù")

                .Replace("&#xE4;", "ä")
                .Replace("&#xEB;", "ë")
                .Replace("&#xEF;", "ï")
                .Replace("&#xF6;", "ö")
                .Replace("&#xFC;", "ü")
                .Replace("&#xC4;", "Ä")
                .Replace("&#xCB;", "Ë")
                .Replace("&#xCF;", "Ï")
                .Replace("&#xD6;", "Ö")
                .Replace("&#xDC;", "Ü")

                .Replace("&#xF1;", "ñ")
                .Replace("&#xD1;", "Ñ")

                .Replace("&#x27;", "'");
        }
    }
}
