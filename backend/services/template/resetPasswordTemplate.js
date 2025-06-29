function resetPasswordTemplate({token, userName}) {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    console.log("Reset link : ", resetLink);
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reset Your Password</title>
            <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
                h2 { color: #333; }
                .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .footer { margin-top: 30px; font-size: 12px; color: #888; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Password Reset Request</h2>
                <p>Hi ${userName},</p>
                <p>We received a request to reset your password. Click the button below to set a new password:</p>
                <a href="${resetLink}" class="btn">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email. This link will expire in 1 hour for your security.</p>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Pen Mail. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = resetPasswordTemplate;