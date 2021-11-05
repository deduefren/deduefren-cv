using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SendGrid.Helpers.Mail;

namespace deduefrencv.postcontactform
{
    public static class PostContactForm
    {
        [FunctionName("PostContactForm")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            [SendGrid(ApiKey = "SendGridApiKey")] IAsyncCollector<SendGridMessage> messageCollector,
            ILogger log)
        {
            string error= "";
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var form = JsonConvert.DeserializeObject<ContactForm>(requestBody);

                var message = new SendGridMessage();
                message.AddTo(System.Environment.GetEnvironmentVariable("ContactMailDestination"));
                message.AddContent("text/html", form.Message);
                message.SetFrom(new EmailAddress(System.Environment.GetEnvironmentVariable("ContactMailSender")));
                message.SetSubject($"deduefren-cv nuevo mensaje de {form.Name} con email {form.Email}");
                
                await messageCollector.AddAsync(message);
                
                await messageCollector.FlushAsync();
                log.LogInformation("C# HTTP trigger email sent");
            }catch (Exception ex){
                error = $"Error on {nameof(PostContactForm)} function: {ex.ToString()}";
                log.LogError(ex, error);
            }
            return new OkObjectResult(error);
        }

        public class ContactForm {
            public string Name { get; set; }
            public string Email { get; set; }

            public string Phone { get; set; }

            public string Message { get; set; }
        }
    }
}
