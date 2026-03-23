import prisma from "./prisma";

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(email, otp) {
  // Delete any existing OTPs for this email
  await prisma.otp.deleteMany({ where: { email } });
  // Create new OTP
  await prisma.otp.create({
    data: { email, code: otp },
  });
}

export async function verifyOTP(email, otp) {
  const record = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { valid: false, error: "OTP expired or not found" };

  // OTP expires after 5 minutes
  if (Date.now() - record.createdAt.getTime() > 5 * 60 * 1000) {
    await prisma.otp.delete({ where: { id: record.id } });
    return { valid: false, error: "OTP has expired" };
  }

  // Max 5 attempts
  if (record.attempts >= 5) {
    await prisma.otp.delete({ where: { id: record.id } });
    return { valid: false, error: "Too many attempts. Request a new OTP." };
  }

  // Increment attempts
  await prisma.otp.update({
    where: { id: record.id },
    data: { attempts: record.attempts + 1 },
  });

  if (record.code !== otp) {
    return { valid: false, error: "Invalid OTP" };
  }

  // OTP matched — delete it
  await prisma.otp.delete({ where: { id: record.id } });
  return { valid: true };
}

export async function canResendOTP(email) {
  const record = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return true;
  // Allow resend after 60 seconds
  return Date.now() - record.createdAt.getTime() > 60 * 1000;
}
