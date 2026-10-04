import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// POST /api/notifications/send
// Body: { userId, type, title, body, link }
export async function POST(req: NextRequest) {
  try {
    const { userId, type, title, body, link } = await req.json();

    if (!userId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: () => {},
        },
      }
    );

    // Insert notification into DB (triggers real-time to client)
    const { data, error } = await supabase
      .from("notifications")
      .insert({ user_id: userId, type: type ?? "system", title, body, link })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Optional: Send email via Resend if API key is set
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Get user email
        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        if (userData?.user?.email) {
          await resend.emails.send({
            from: process.env.EMAIL_FROM ?? "noreply@yourdomain.com",
            to: userData.user.email,
            subject: title,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #1E1B4B; padding: 24px; border-radius: 12px 12px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 20px;">AutomateAI.</h1>
                </div>
                <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
                  <h2 style="color: #1e293b; margin-top: 0;">${title}</h2>
                  ${body ? `<p style="color: #475569;">${body}</p>` : ""}
                  ${link ? `<a href="${process.env.NEXT_PUBLIC_APP_URL}${link}" style="display: inline-block; background: #F56962; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">View in Dashboard</a>` : ""}
                </div>
              </div>
            `,
          });
        }
      } catch (emailErr) {
        // Email sending is optional - don't fail the request
        console.warn("Email send failed (optional):", emailErr);
      }
    }

    return NextResponse.json({ success: true, notification: data });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}