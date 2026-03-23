"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
  const { sendOTP, resendOTP, verifyOTP } = useAuth();
  const [step, setStep] = useState("credentials"); // "credentials" | "otp"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    if (step !== "otp") return;
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer, step]);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await sendOTP(username, password);
    if (result.success) {
      setStep("otp");
      setResendTimer(60);
      setCanResend(false);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newOtp.every((d) => d !== "")) {
      submitOtp(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
      submitOtp(pasted);
    }
  };

  const submitOtp = async (code) => {
    setError("");
    setLoading(true);
    const result = await verifyOTP(code);
    if (!result.success) {
      setError(result.error);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setError("");
    setCanResend(false);
    setResendTimer(60);
    const result = await resendOTP();
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleBack = () => {
    setStep("credentials");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {step === "credentials" ? (
          <>
            <div className="admin-login-header">
              <div className="admin-login-icon">
                <i className="fa-solid fa-shield-halved" />
              </div>
              <h1>Admin Access</h1>
              <p>Enter your credentials to continue</p>
            </div>
            <form onSubmit={handleCredentialsSubmit} className="admin-login-form">
              {error && <div className="admin-alert admin-alert-error">{error}</div>}
              <div className="admin-form-group">
                <label>Username</label>
                <div className="admin-input-wrapper">
                  <i className="fa-solid fa-user" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Password</label>
                <div className="admin-input-wrapper">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="admin-login-header">
              <div className="admin-login-icon">
                <i className="fa-solid fa-envelope-circle-check" />
              </div>
              <h1>Verify OTP</h1>
              <p>Enter the 6-digit code sent to your email</p>
            </div>
            <div className="admin-login-form">
              {error && <div className="admin-alert admin-alert-error">{error}</div>}
              <div className="otp-input-group" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-input"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <button
                onClick={() => submitOtp(otp.join(""))}
                className="admin-btn admin-btn-primary"
                disabled={loading || otp.some((d) => d === "")}
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <div className="otp-actions">
                {canResend ? (
                  <button onClick={handleResend} className="otp-resend-btn">
                    <i className="fa-solid fa-rotate-right" /> Resend OTP
                  </button>
                ) : (
                  <span className="otp-timer">
                    Resend in <strong>{resendTimer}s</strong>
                  </span>
                )}
                <button onClick={handleBack} className="otp-back-btn">
                  <i className="fa-solid fa-arrow-left" /> Back to login
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
