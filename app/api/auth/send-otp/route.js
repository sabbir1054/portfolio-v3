import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";
import { generateOTP, storeOTP, canResendOTP } from "@/lib/otp";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "mdsabbir1054@gmail.com";

export async function POST(request) {
  const { username, password, resend } = await request.json();

  // On resend, skip credential check but check cooldown
  if (resend) {
    if (!(await canResendOTP(ADMIN_EMAIL))) {
      return NextResponse.json(
        { error: "Please wait 1 minute before requesting a new OTP" },
        { status: 429 }
      );
    }
  } else {
    // Validate credentials first
    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  }

  const otp = generateOTP();
  await storeOTP(ADMIN_EMAIL, otp);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"mdsabbir.dev" <${process.env.SMTP_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `Admin Login OTP: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 30px; background: #0A0A0F; border-radius: 12px; border: 1px solid #1E1E35;">
          <h2 style="color: #E0E0FF; text-align: center; margin-bottom: 10px;">Admin Login Verification</h2>
          <p style="color: #9A9AB0; text-align: center;">Your one-time password is:</p>
          <div style="background: #12121F; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #00FF88; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #9A9AB0; text-align: center; font-size: 13px;">This code expires in 5 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP email error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
