import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body = await req.json();
    const { firstName, middleName, lastName, phone, email, from, to, date, vehicle, message } = body;

    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #1a2942; padding: 24px 32px;">
          <h1 style="color: #f97316; margin: 0; font-size: 20px;">🚖 New Cab Enquiry</h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">Vaishnavi Travels – Mangalore</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;">👤 Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">📞 Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${phone}</td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">📧 Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${email}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">📍 Pickup</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${from || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">🏁 Drop</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${to || "Not specified"}</td>
            </tr>
            ${date ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">📅 Travel Date</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${date}</td>
            </tr>` : ""}
            ${vehicle ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">🚗 Vehicle</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px;">${vehicle}</td>
            </tr>` : ""}
            ${message ? `<tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">💬 Message</td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">${message}</td>
            </tr>` : ""}
          </table>
        </div>
        <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Reply to this email or call ${phone} to respond to this enquiry.</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vaishnavi Travels <onboarding@resend.dev>",
        to: ["vaishnavitravels42@gmail.com"],
        subject: `New Cab Enquiry from ${fullName} – ${from || "?"} → ${to || "?"}`,
        html: htmlBody,
        reply_to: email || undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending enquiry email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
