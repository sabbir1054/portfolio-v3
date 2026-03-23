function baseLayout(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #06060C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #06060C; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width: 560px; width: 100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">
                <span style="color: #00FF88;">mdsabbir</span><span style="color: #7B2FFF;">.</span><span style="color: #A855F7;">dev</span>
              </h1>
            </td>
          </tr>
          <!-- Body Card -->
          <tr>
            <td style="background: linear-gradient(145deg, #0D0D1F, #12121F); border-radius: 16px; border: 1px solid #1E1E35; overflow: hidden;">
              <!-- Gradient Top Bar -->
              <div style="height: 4px; background: linear-gradient(to right, #00FF88, #7B2FFF);"></div>
              <div style="padding: 40px 36px;">
                ${content}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: #5A5A7A; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} mdsabbir.dev — Full Stack Developer
              </p>
              <div style="margin-top: 12px;">
                <a href="https://github.com/sabbir1054" style="color: #5A5A7A; text-decoration: none; margin: 0 8px; font-size: 12px;">GitHub</a>
                <span style="color: #2A2A45;">•</span>
                <a href="https://www.linkedin.com/in/md-sabbir-hossain-1054" style="color: #5A5A7A; text-decoration: none; margin: 0 8px; font-size: 12px;">LinkedIn</a>
                <span style="color: #2A2A45;">•</span>
                <a href="https://www.upwork.com/freelancers/~01a76df77f79bd0eaa" style="color: #5A5A7A; text-decoration: none; margin: 0 8px; font-size: 12px;">Upwork</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactEmail({ name, email, phone, subject, message }) {
  return baseLayout(`
    <h2 style="color: #E0E0FF; margin: 0 0 6px 0; font-size: 22px;">New Message Received</h2>
    <p style="color: #00FF88; margin: 0 0 28px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">${subject || "Contact Form"}</p>

    <!-- Info Table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 14px 16px; background: #0A0A1A; border-radius: 10px 10px 0 0; border-bottom: 1px solid #1E1E35;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="color: #5A5A7A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">From</td>
              <td style="color: #E0E0FF; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 14px 16px; background: #0A0A1A; border-bottom: 1px solid #1E1E35;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="color: #5A5A7A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">Email</td>
              <td><a href="mailto:${email}" style="color: #7B2FFF; font-size: 15px; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 14px 16px; background: #0A0A1A; border-radius: 0 0 10px 10px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="color: #5A5A7A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">Phone</td>
              <td style="color: #E0E0FF; font-size: 15px;">${phone || "Not provided"}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <div style="background: #0A0A1A; border-radius: 10px; padding: 20px;">
      <p style="color: #5A5A7A; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 10px 0;">Message</p>
      <p style="color: #C8C8E0; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>

    <!-- Reply Button -->
    <div style="text-align: center; margin-top: 28px;">
      <a href="mailto:${email}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(to right, #00FF88, #7B2FFF); color: #0A0A0F; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 50px; letter-spacing: 0.5px;">Reply to ${name}</a>
    </div>
  `);
}

export function otpEmail(otp) {
  return baseLayout(`
    <div style="text-align: center;">
      <div style="display: inline-block; width: 64px; height: 64px; background: linear-gradient(135deg, #7B2FFF22, #00FF8822); border-radius: 16px; line-height: 64px; margin-bottom: 20px;">
        <span style="font-size: 28px;">🔐</span>
      </div>
      <h2 style="color: #E0E0FF; margin: 0 0 8px 0; font-size: 22px;">Admin Verification</h2>
      <p style="color: #9A9AB0; margin: 0 0 30px 0; font-size: 14px;">Enter this code to access your dashboard</p>

      <!-- OTP Box -->
      <div style="background: #0A0A1A; border: 1px solid #1E1E35; border-radius: 12px; padding: 28px; margin: 0 auto; max-width: 300px;">
        <p style="color: #5A5A7A; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px 0;">Your OTP Code</p>
        <h1 style="color: #00FF88; font-size: 40px; letter-spacing: 10px; margin: 0; font-family: 'Courier New', monospace;">${otp}</h1>
      </div>

      <!-- Timer Warning -->
      <div style="margin-top: 24px; background: #7B2FFF12; border: 1px solid #7B2FFF33; border-radius: 8px; padding: 12px 20px; display: inline-block;">
        <p style="color: #A855F7; font-size: 13px; margin: 0;">⏱ Expires in <strong>5 minutes</strong></p>
      </div>

      <p style="color: #5A5A7A; font-size: 12px; margin-top: 24px;">If you didn't request this code, ignore this email.</p>
    </div>
  `);
}

export function subscriptionEmail(email) {
  return baseLayout(`
    <div style="text-align: center;">
      <div style="display: inline-block; width: 64px; height: 64px; background: linear-gradient(135deg, #00FF8822, #7B2FFF22); border-radius: 16px; line-height: 64px; margin-bottom: 20px;">
        <span style="font-size: 28px;">📬</span>
      </div>
      <h2 style="color: #E0E0FF; margin: 0 0 8px 0; font-size: 22px;">New Subscriber</h2>
      <p style="color: #9A9AB0; margin: 0 0 24px 0; font-size: 14px;">Someone subscribed to your newsletter</p>

      <div style="background: #0A0A1A; border-radius: 10px; padding: 20px;">
        <p style="color: #5A5A7A; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px 0;">Email Address</p>
        <a href="mailto:${email}" style="color: #00FF88; font-size: 18px; text-decoration: none; font-weight: 600;">${email}</a>
      </div>
    </div>
  `);
}
