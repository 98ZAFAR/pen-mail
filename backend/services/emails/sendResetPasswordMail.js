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

    console.log("Reset password email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Error sending reset password email:", err);
    return false;
  }
};

module.exports = sendResetPasswordMail;