using System.Net.Mail;

namespace CollegeBuzz.Services
{
    public interface IMailService
    {
        void SendMail(List<string> toEmailAddress, string body, string subject, string email);
        void PersonalMail(string toEmailAddress, string body, string subject, string email);
    }
    public class MailService : IMailService
    {
        public void SendMail(List<string> toEmailAddress, string body, string subject, string email)
        {
            MailMessage mailMessage = new MailMessage();
            MailAddress fromMail = new MailAddress(email);
            mailMessage.From = fromMail;

            foreach (var adr in toEmailAddress)
            {
                mailMessage.To.Add(adr);
            }
            mailMessage.Subject = subject;
            mailMessage.Body = body;

            mailMessage.IsBodyHtml = true;

            //mailMessage.Sender = new MailAddress(email);
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;


            System.Net.NetworkCredential credential = new System.Net.NetworkCredential();
            credential.UserName = "forampdalsaniya@gmail.com";
            credential.Password = "vpjutndphmluklbg";
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = credential;
            mailMessage.From = fromMail;
            try
            {
                smtpClient.Send(mailMessage);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public void PersonalMail(string toEmailAddress, string body, string subject, string email)
        {
            MailMessage mailMessage = new MailMessage();
            MailAddress fromMail = new MailAddress(email);
            mailMessage.From = fromMail;
            MailAddress toMail = new MailAddress(toEmailAddress);
            mailMessage.To.Add(toMail);
            mailMessage.Subject = subject;
            mailMessage.Body = body;

            mailMessage.IsBodyHtml = true;

            //mailMessage.Sender = new MailAddress(email);
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;


            System.Net.NetworkCredential credential = new System.Net.NetworkCredential();
            credential.UserName = "forampdalsaniya@gmail.com";
            credential.Password = "vpjutndphmluklbg";
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = credential;
            mailMessage.From = fromMail;
            try
            {
                smtpClient.Send(mailMessage);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
