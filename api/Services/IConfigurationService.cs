namespace api.Services
{
    public interface IConfigurationService
    {
        string ContactMailDestination { get; }
        string ContactMailSender { get; }
    }
}