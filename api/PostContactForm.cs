using api.Exceptions;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid.Helpers.Mail;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace deduefrencv.postcontactform
{
    public class PostContactForm
    {
        private readonly IConfigurationService configuration;

        public PostContactForm(IConfigurationService configuration)
        {
            this.configuration = configuration;
        }

        [FunctionName("PostContactForm")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            [SendGrid(ApiKey = "SendGridApiKey")] IAsyncCollector<SendGridMessage> messageCollector,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                if (req.Body.Length == 0)
                {
                    return new JsonResult(Result.MissingArguments());
                }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var form = JsonConvert.DeserializeObject<ContactForm>(requestBody);

                //Validate mandatory fields
                if (string.IsNullOrEmpty(form.Name))
                    return new JsonResult(Result.MissingArguments());
                if (string.IsNullOrEmpty(form.Email))
                    return new JsonResult(Result.MissingArguments());
                if (string.IsNullOrEmpty(form.Message))
                    return new JsonResult(Result.MissingArguments());

                //Check for xss or dangerous content
                XssValidator.ThrowIfForbiddenInput(form.Name);
                XssValidator.ThrowIfForbiddenInput(form.Email);
                XssValidator.ThrowIfForbiddenInput(form.Message);
                XssValidator.ThrowIfForbiddenInput(form.Phone);

                //Encode as countermeasure
                string encodedName = System.Net.WebUtility.HtmlEncode(form.Name);
                string encodedEmail = System.Net.WebUtility.HtmlEncode(form.Email);
                string encodedPhone = System.Net.WebUtility.HtmlEncode(form.Phone);
                string encodedMessage = System.Net.WebUtility.HtmlEncode(form.Message);

                //Get and format mail template
                var binDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                var html = File.ReadAllText(binDirectory + "/MailTemplate.html");
                html = FormatTemplate(html, nameof(form.Name), encodedName);
                html = FormatTemplate(html, nameof(form.Email), encodedEmail);
                html = FormatTemplate(html, nameof(form.Phone), encodedPhone);
                html = FormatTemplate(html, nameof(form.Message), encodedMessage);

                //Build message and send
                var message = new SendGridMessage();
                message.AddTo(configuration.ContactMailDestination);
                message.SetFrom(new EmailAddress(configuration.ContactMailSender));
                message.SetSubject($"Nuevo mensaje de {encodedName} ({encodedEmail})");
                message.AddContent("text/html", html);

                await messageCollector.AddAsync(message);

                //TODO: ¿Is this line necessary?
                //await messageCollector.FlushAsync();

                //TODO: Maybe send an email back to the sender leting them know their rights.

                log.LogInformation($"C# HTTP trigger email sent from {encodedEmail}");
            }
            catch (XssException)
            {
                return new JsonResult(Result.InvalidInput());
            }
            catch (Exception ex)
            {
                log.LogError(ex, $"Error on {nameof(PostContactForm)} function: {ex}");
                return new JsonResult(Result.UnexpectedError(ex.Message));
            }
            return new JsonResult(Result.Success());
        }

        private static string FormatTemplate(string html, string field, string value)
        {
            return html.Replace("{{" + field + "}}", value);
        }

        public class ContactForm
        {
            public string Name { get; set; }
            public string Email { get; set; }

            public string Phone { get; set; }

            public string Message { get; set; }
        }

        public class Result
        {
            public const int SuccessCode = 0;
            public const int MissingArgumentCode = -1;
            public const int UnexpectedErrorCode = -2;
            public const int InvalidInputCode = -3;

            private Result(int statusCode, string message = "")
            {
                StatusCode = statusCode;
                Message = message;
            }

            public int StatusCode { get; }
            public string Message { get; }

            public static Result MissingArguments()
            {
                return new Result(MissingArgumentCode, "MissingArgument");
            }

            public static Result UnexpectedError(string message)
            {
                return new Result(UnexpectedErrorCode, message);
            }

            public static Result InvalidInput()
            {
                return new Result(InvalidInputCode, "InvalidInput");
            }

            internal static Result Success()
            {
                return new Result(SuccessCode);
            }
        }
    }
}
