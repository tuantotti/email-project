export default function sendMessageData(
  id,
  company,
  description,
  subject,
  time,
  email_address
) {
  return {
    type: "sendMailData",
    id,
    company,
    description,
    subject,
    time,
    email_address
  };
}
