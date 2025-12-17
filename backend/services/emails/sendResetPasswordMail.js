const transporter = require("../../utils/mailer");
const resetPasswordTemplate = require("../template/resetPasswordTemplate");

const sendResetPasswordMail = async ({ to, token, userName }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pen Mail - [Admin]" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject: "Reset Password Request",
      html: resetPasswordTemplate({ token, userName }),
    });

    logger.success("Password reset email sent", { to, messageId: info.messageId });
    return true;
  } catch (err) {
    logger.error("Error sending reset password email", { to, error: err.message });
    return false;
  }
};

module.exports = sendResetPasswordMail;