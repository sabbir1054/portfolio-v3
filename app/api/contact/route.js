import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactEmail, subscriptionEmail } from "@/lib/emailTemplate";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const isSubscription = name === "Newsletter Subscriber";

    await transporter.sendMail({
      from: `"mdsabbir.dev" <${process.env.SMTP_EMAIL}>`,
      to: "mdsabbir1054@gmail.com",
      replyTo: email,
      subject: isSubscription
        ? `New Subscriber: ${email}`
        : subject || `New Contact from ${name}`,
      html: isSubscription
        ? subscriptionEmail(email)
        : contactEmail({ name, email, phone, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
