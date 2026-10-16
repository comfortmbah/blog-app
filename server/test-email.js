import "dotenv/config";
import { sendEmail } from "./src/utils/emailService.js";


const testEmail = async () => {
  try {
    const result = await sendEmail({
      to: "sylvestermbah90@gmail.com",
      subject: "Blog App Email Service Test",
      html: `
        <h2>Blog App Email Test</h2>
        <p>Your Resend email service is working</p>
        <p>This confirms that your backend can send emails through Resend.</p>
      `,
      text: "Blog App Email Test: Your Resend email service is working",
    });

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Email test failed:", error.message);
    process.exitCode = 1;
  }
};

testEmail();