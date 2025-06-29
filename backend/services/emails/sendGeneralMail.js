const generalMailTemplate = require("../template/generalMailTemplate");
const transporter = require("../../utils/mailer");

const sendGeneralMail = async ({ to, subject, title, body }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pen Mail - [Admin]" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html: generalMailTemplate({
        title: title || "General Notification",
        body: body || "This is a general notification from Pen Mail.",
      }),
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Mail send error:", err);
    return false;
  }
};

module.exports = sendGeneralMail;
