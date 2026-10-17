import { findUserByEmail, updateUserPassword } from '../models/userModel.js';
import { createPasswordResetToken, invalidatePasswordResetTokens, findValidPasswordResetToken,
  markPasswordResetTokenAsUsed
 } from '../models/passwordResetModel.js';
import { generatePasswordResetToken, hashPasswordResetToken } from "../utils/passwordResetToken.js"
import { sendEmail } from '../utils/emailService.js';



export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    const message = "If an account with that email exists, a password reset link will be sent.";

    if (!user) {
      return res.status(200).json({ message });
    }

    await invalidatePasswordResetTokens(user.id);

    const rawToken = generatePasswordResetToken();

    const tokenHash = hashPasswordResetToken(rawToken);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await createPasswordResetToken({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const resetUrl = new URL("/reset-password", process.env.CLIENT_URL);

    resetUrl.searchParams.set("token", rawToken);

    await sendEmail({
      to: user.email,
      subject: "Reset Your Blog App Password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Request</h2>

        <p>Hello ${escapeHtml(user.name)},</p>

        <p>
          We received a request to reset your Blog App password.
        </p>

        <p>
          <a href="${escapeHtml(resetUrl.toString())}">
            Reset Your Password
          </a>
        </p>

        <p>This link expires in 15 minutes.</p>

        <p>
          If you didn't request this change, you can ignore this email.
        </p>
      </div>
      `,
      text:`
        Hello ${user.name},

        We received a request to reset your Blog App password.

        Open this link to reset your password:
        ${resetUrl.toString()}

        This link expires in 15 minutes.

        If you didn't request this change, you can ignore this email.
      `,
    });

    return res.status(200).json({ message });
  } catch (emailError) {
    console.error("Password reset email delivery failed:", {
      message: emailError.message,
    });
  }
};



const escapeHtml = (value = "") => {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
};


export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const tokenHash = hashPasswordResetToken(token);

    const resetToken = await findValidPasswordResetToken(tokenHash);

    if (!resetToken) {
      return res.status(400).json({
        message: "Invalid or expired password reset link.",
      });
    }

    // STEP 4: Hash the new password
    const passwordHash = await bcrypt.hash(password, 12);

    // STEP 5: Update the user's password
    const updatedUser = await updateUserPassword(
      resetToken.user_id,
      passwordHash
    );

    if (!updatedUser) {
      return res.status(400).json({
        message: "Invalid or expired password reset link.",
      });
    }

    // STEP 6: Mark the reset token as used
    const usedToken = await markPasswordResetTokenAsUsed(
      resetToken.id
    );

    if (!usedToken) {
      return res.status(400).json({
        message: "Invalid or expired password reset link.",
      });
    }

    // ✅ STEP 7: Confirm success
    return res.status(200).json({
      message: "Your password has been reset successfully. You can now log in.",
    });
  } catch (error) {
    return next(error);
  }
};