const generalMailTemplate = require("../template/generalMailTemplate");
const transporter = require("../../utils/mailer");
const logger = require("../../utils/logger");

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

    logger.success("Email sent", { to, subject, messageId: info.messageId });
    return true;
  } catch (err) {
    logger.error("Mail send error", { to, subject, error: err.message });
    return false;
  }
};

module.exports = sendGeneralMail;
