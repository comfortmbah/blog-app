import { Resend } from "resend";


export const sendEmail = async ({ to, subject, html, text }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not configured");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({ from, to, subject, html, text });

  if (error) {
    throw new Error(`Email could not be sent: ${error.message}`);
  }

  return data;
}