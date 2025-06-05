import "dotenv/config";
import { sendMail } from "./mailer";

async function main() {
    const to = "dkranjoz16@gmail.com"; // Change to a real recipient (not your EMAIL_USER)
    const subject = "Test Email from Car Rental System";
    const text = "This is a plain text test email.";
    const html = "<h2>This is a test email from your Car Rental System mailer.</h2>";

    const result = await sendMail(to, subject, text, html);
    console.log("Result:", result);
}

main().catch(console.error);