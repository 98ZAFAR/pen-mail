const generalMailTemplate = ({ title, body }) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>${title}</title>
                <style>
                    body {
                        background: #f4f6fb;
                        font-family: 'Segoe UI', Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background: #fff;
                        border-radius: 12px;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.07);
                        padding: 32px 24px;
                    }
                    .header {
                        border-bottom: 1px solid #eaeaea;
                        padding-bottom: 16px;
                        margin-bottom: 24px;
                        text-align: center;
                    }
                    .header h1 {
                        color: #2d3748;
                        font-size: 2rem;
                        margin: 0;
                        letter-spacing: 1px;
                    }
                    .content {
                        color: #4a5568;
                        font-size: 1.05rem;
                        line-height: 1.7;
                    }
                    .footer {
                        margin-top: 32px;
                        text-align: center;
                        color: #a0aec0;
                        font-size: 0.95rem;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>${title}</h1>
                    </div>
                    <div class="content">
                        ${body}
                    </div>
                    <div class="footer">
                        &copy; ${new Date().getFullYear()} Pen Mail. All rights reserved.
                    </div>
                </div>
            </body>
        </html>
    `;
};

module.exports = generalMailTemplate;
