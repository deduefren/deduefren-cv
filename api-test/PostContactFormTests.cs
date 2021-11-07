using api.Services;
using api_test.Helpers;
using deduefrencv.postcontactform;
using FluentAssertions;
using FluentAssertions.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SendGrid.Helpers.Mail;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace api_test
{
    [TestClass]
    public class PostContactFormTests
    {
        private const string MailSender = "sender@mail.com";
        private const string Destination = "destination@mail.com";
        private readonly ILogger logger = TestFactory.CreateLogger();
        private readonly Mock<IAsyncCollector<SendGridMessage>> sendGrid;
        private readonly Mock<IConfigurationService> config;
        private readonly PostContactForm sut;

        public PostContactFormTests()
        {
            sendGrid = new Mock<IAsyncCollector<SendGridMessage>>();
            config = new Mock<IConfigurationService>();
            config.Setup(x => x.ContactMailDestination).Returns(Destination);
            config.Setup(x => x.ContactMailSender).Returns(MailSender);

            sut = new PostContactForm(config.Object);
        }

        [TestMethod]
        public async Task GivenEmptyValues_WhenSending_ReturnsMissingArguments()
        {
            var request = TestFactory.CreateEmptyHttpRequest();
            var response = await GetResponse(request);
            AssertMissingArgument(response);
        }

        [TestMethod]
        public async Task GivenRequestWithoutMessage_WhenSending_ReturnsMissingArguments()
        {
            var request = TestFactory.CreateHttpRequest(new PostContactForm.ContactForm()
            {
                Name = "John",
                Email = "john@doe.com",
                Phone = "123456789"
            });
            var response = await GetResponse(request);
            AssertMissingArgument(response);
        }

        [TestMethod]
        public async Task GivenRequestWithoutEmail_WhenSending_ReturnsMissingArguments()
        {
            var request = TestFactory.CreateHttpRequest(new PostContactForm.ContactForm()
            {
                Name = "John",
                Message = "Something",
                Phone = "123456789"
            });
            var response = await GetResponse(request);
            AssertMissingArgument(response);
        }

        [TestMethod]
        public async Task GivenRequestWithoutName_WhenSending_ReturnsMissingArguments()
        {
            var request = TestFactory.CreateHttpRequest(new PostContactForm.ContactForm()
            {
                Email = "john@doe.com",
                Message = "Something",
                Phone = "123456789"
            });
            var response = await GetResponse(request);
            AssertMissingArgument(response);
        }

        [TestMethod]
        public async Task GivenValidMessage_WhenMailSendFail_ReturnsUnexpectedError()
        {
            //Arrange
            var request = TestFactory.CreateHttpRequest(ValidContactForm());
            sendGrid.Setup(x => x.AddAsync(It.IsAny<SendGridMessage>(), default)).Throws(new System.Exception("Can't send message"));
            //Act
            var response = await GetResponse(request);
            //Assert
            var value = (PostContactForm.Result)response.Value;
            value.StatusCode.Should().Be(PostContactForm.Result.UnexpectedErrorCode);
            value.Message.Should().NotBeNullOrWhiteSpace();
        }

        [TestMethod]
        public async Task GivenValidMessage_WhenSending_ReturnsProperValues()
        {
            //Arrange
            var request = TestFactory.CreateHttpRequest(ValidContactForm());
            SendGridMessage message = null;
            sendGrid.Setup(x => x.AddAsync(It.IsAny<SendGridMessage>(), default)).Callback<SendGridMessage, CancellationToken>((x, y) => message = x);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);

            message.From.Email.Should().Be(MailSender);
            message.Personalizations[0].Tos[0].Email.Should().Be(Destination);
            message.Personalizations[0].Subject.Should().Be("Nuevo mensaje de John (john@doe.com)");
            message.HtmlContent.Should().NotContain("{{");
            message.HtmlContent.Should().NotContain("}}");
        }

        [TestMethod]
        public async Task GivenNameTooShort_WhenSending_IsInvalid()
        {
            var form = ValidContactForm();
            form.Name = "a";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidArgument(response);
        }

        [TestMethod]
        public async Task GivenNameTooLong_WhenSending_IsInvalid()
        {
            var form = ValidContactForm();
            form.Name = "123456789012345678901234567890123456789012345678901234567890123456789012345678901";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidArgument(response);
        }

        [TestMethod]
        public async Task GivenPhoneTooLong_WhenSending_IsInvalid()
        {
            var form = ValidContactForm();
            form.Phone = "01234567890123456";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidArgument(response);
        }

        [TestMethod]
        public async Task GivenMessageTooShort_WhenSending_IsInvalid()
        {
            var form = ValidContactForm();
            form.Message = "s";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidArgument(response);
        }

        [TestMethod]
        public async Task GivenMessageTooLong_WhenSending_IsInvalid()
        {
            var form = ValidContactForm();
            form.Message = new string('*', 1001); // 1001 stars! :)
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidArgument(response);
        }

        [TestMethod]
        public async Task GivenNameWithDieresis_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "ä ë ï ö ü";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenNameWithUpperDieresis_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "Ä Ë Ï Ö Ü";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenNameWithTilde_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "á é í ó ú ´";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenNameWithUpperTilde_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "Á É Í Ó Ú";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenFrenchWithCircunflexTilde_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "â ê î ô û ^";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenFrenchWithCircunflexUpperTilde_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "Â Ê Î Ô Û";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenFrenchWithGraveDiacritics_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "à è ì ò ù `";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenFrenchWithUpperGraveDiacritics_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Name = "À È Ì Ò Ù";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenDescriptionWithHypens_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Message = "Luke, I'm your father";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenGraveHypen_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Message = "Luke, I`m your -father";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenDescriptionWithUrl_WhenSending_IsValid()
        {
            var form = ValidContactForm();
            form.Email = "Look https://es.wikipedia.org/wiki/Luke,_yo_soy_tu_padre";
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertSuccess(response);
        }

        [TestMethod]
        public async Task GivenXSSName_WhenSending_Ignored()
        {
            string xssMessage = "<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>";

            var form = ValidContactForm();
            form.Name += xssMessage;
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidOutput(response);
        }

        [TestMethod]
        public async Task GivenXSSPhone_WhenSending_Ignored()
        {
            string xssMessage = "<SCRIPT>";

            var form = ValidContactForm();
            form.Phone = xssMessage;
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidOutput(response);
        }

        [TestMethod]
        public async Task GivenXSSEmail_WhenSending_Ignored()
        {
            string xssMessage = "<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>";

            var form = ValidContactForm();
            form.Email += xssMessage;
            //Arrange
            var request = TestFactory.CreateHttpRequest(form);
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidOutput(response);
        }

        /// <summary>
        /// Tests from https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html
        /// </summary>
        [DataTestMethod]
        [DataRow("<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>")]
        [DataRow("<IMG SRC=javascript:alert('XSS')>")]
        [DataRow("<IMG SRC=\"javascript: alert('XSS'); \">")]
        [DataRow("<IMG \"\"\" >< SCRIPT > alert(\"XSS\") </ SCRIPT > \"\\>")]
        [DataRow("<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>")]
        [DataRow("<IMG SRC= onmouseover=\"alert('xxs')\">")]
        [DataRow("<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>")]
        [DataRow("<<SCRIPT>alert(\"XSS\");//\\<</SCRIPT>")]
        [DataRow("<iframe src=http://xss.rocks/scriptlet.html <")]
        [DataRow("Set.constructor`alert\x28document.domain\x29")]
        public async Task GivenXSSMessage_WhenSending_Ignored(string xssMessage)
        {
            //Arrange
            var request = TestFactory.CreateHttpRequest(ValidContactForm(message: xssMessage));
            //Act
            var response = await GetResponse(request);
            //Assert
            AssertInvalidOutput(response);
        }

        private async Task<JsonResult> GetResponse(Microsoft.AspNetCore.Http.HttpRequest request)
        {
            return (JsonResult)await sut.Run(
                request, 
                sendGrid.Object, 
                logger, 
                new Microsoft.Azure.WebJobs.ExecutionContext() 
                {
                    //https://github.com/Azure/azure-functions-host/wiki/Retrieving-information-about-the-currently-running-function
                    FunctionAppDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) 
                }
                );
        }

        private static void AssertSuccess(JsonResult response)
        {
            var value = (PostContactForm.Result)response.Value;
            value.StatusCode.Should().Be(PostContactForm.Result.SuccessCode);
            value.Message.Should().BeEmpty();
        }

        private static void AssertInvalidArgument(JsonResult response)
        {
            var value = (PostContactForm.Result)response.Value;
            value.StatusCode.Should().Be(PostContactForm.Result.InvalidArgumentCode);
            value.Message.Should().NotBeNullOrWhiteSpace();
        }

        private static void AssertMissingArgument(JsonResult response)
        {
            var value = (PostContactForm.Result)response.Value;
            value.StatusCode.Should().Be(PostContactForm.Result.MissingArgumentCode);
            value.Message.Should().NotBeNullOrWhiteSpace();
        }

        private static void AssertInvalidOutput(JsonResult response)
        {
            var value = (PostContactForm.Result)response.Value;
            value.StatusCode.Should().Be(PostContactForm.Result.InvalidInputCode);
            value.Message.Should().NotBeNullOrWhiteSpace();
        }

        private static PostContactForm.ContactForm ValidContactForm(string message = "Hellooooooo")
        {
            return new PostContactForm.ContactForm()
            {
                Name = "John",
                Email = "john@doe.com",
                Message = message,
                Phone = "123456789"
            };
        }
    }
}
