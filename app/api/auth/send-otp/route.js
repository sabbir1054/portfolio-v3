import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";
import { generateOTP, storeOTP, canResendOTP } from "@/lib/otp";
import { otpEmail } from "@/lib/emailTemplate";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "mdsabbir1054@gmail.com";

export async function POST(request) {
  const { username, password, resend } = await request.json();

  if (resend) {
    if (!(await canResendOTP(ADMIN_EMAIL))) {
      return NextResponse.json(
        { error: "Please wait 1 minute before requesting a new OTP" },
        { status: 429 }
      );
    }
  } else {
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
      html: otpEmail(otp),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP email error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
