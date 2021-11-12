using api.Exceptions;
using System;
using System.Text;
using System.Text.RegularExpressions;

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

            if (!ValidateAntiXSS(value))
            {
                throw new XssException("Forbidden input. The following characters are not allowed: &, <, >, \", '");
            }
        }

        //Some defense, but in the end output encode will be used later.
        public static bool ValidateAntiXSS(string inputParameter)
        {
            if (string.IsNullOrEmpty(inputParameter))
                return true;

            // Following regex convers all the js events and html tags mentioned in followng links.
            //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet                 
            //https://msdn.microsoft.com/en-us/library/ff649310.aspx

            var pattren = new StringBuilder();

            //Checks any js events i.e. onKeyUp(), onBlur(), alerts and custom js functions etc.             
            pattren.Append(@"((alert|on\w+|function\s+\w+)\s*\(\s*(['+\d\w](,?\s*['+\d\w]*)*)*\s*\))");

            //Checks any html tags i.e. <script, <embed, <object etc.
            pattren.Append(@"|(<(script|iframe|embed|frame|frameset|object|img|applet|body|html|style|layer|link|ilayer|meta|bgsound))");

            return !Regex.IsMatch(System.Web.HttpUtility.UrlDecode(inputParameter), pattren.ToString(), RegexOptions.IgnoreCase | RegexOptions.Compiled);
        }
    }
}
