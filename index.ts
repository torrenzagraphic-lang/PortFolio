import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") throw new Error("Invalid payload");

  const { name, email, message } = body as Record<string, unknown>;

  const cleanName = String(name ?? "").trim();
  const cleanEmail = String(email ?? "").trim();
  const cleanMessage = String(message ?? "").trim();

  if (cleanName.length < 2 || cleanName.length > 80) throw new Error("Invalid name");
  if (cleanEmail.length < 5 || cleanEmail.length > 255 || !isEmail(cleanEmail)) throw new Error("Invalid email");
  if (cleanMessage.length < 10 || cleanMessage.length > 2000) throw new Error("Invalid message");

  return { name: cleanName, email: cleanEmail, message: cleanMessage };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("CONTACT_TO_EMAIL");

    if (!resendApiKey) throw new Error("Missing RESEND_API_KEY");
    if (!toEmail) throw new Error("Missing CONTACT_TO_EMAIL");

    const payload = validate(await req.json());
    const resend = new Resend(resendApiKey);

    const subject = `New message from ${payload.name}`;
    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5">
        <h2 style="margin: 0 0 12px">New portfolio contact</h2>
        <p style="margin: 0 0 8px"><strong>Name:</strong> ${payload.name}</p>
        <p style="margin: 0 0 8px"><strong>Email:</strong> ${payload.email}</p>
        <p style="margin: 16px 0 8px"><strong>Message:</strong></p>
        <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word; padding: 12px; background: #f6f6f6; border-radius: 8px">${payload.message}</pre>
      </div>
    `;

    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: payload.email,
      subject,
      html,
    });

    return new Response(JSON.stringify({ ok: true, id: (result as any)?.id ?? null }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
