import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // ── Basic server-side validation ──────────────────────────────────
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Nodemailer transporter (Gmail + App Password) ─────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // your Gmail address
        pass: process.env.GMAIL_PASS,   // Gmail App Password (not your login password)
      },
    });

    // ── Email to Anushka ──────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,         // sends to yourself
      replyTo: email,                     // reply goes directly to the visitor
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; color: #e4e4e7; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 1.3rem; font-weight: 700; color: #fff; letter-spacing: -0.02em;">
              New Portfolio Message
            </h1>
            <p style="margin: 6px 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.75);">
              Via anushkaadak.dev · Contact Form
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a; width: 90px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.95rem; color: #e4e4e7;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.95rem; color: #3B82F6;"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 0.95rem; color: #e4e4e7;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <div style="font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #71717a; margin-bottom: 12px;">Message</div>
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; font-size: 0.95rem; line-height: 1.75; color: #d4d4d8; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 28px; padding: 16px 20px; background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.15); border-radius: 8px; font-size: 0.82rem; color: #71717a;">
              💡 Reply directly to this email to respond to <strong style="color: #e4e4e7;">${name}</strong> at <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a>.
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.75rem; color: #52525b; text-align: center;">
            Sent from your portfolio contact form · anushkaadak.dev
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
