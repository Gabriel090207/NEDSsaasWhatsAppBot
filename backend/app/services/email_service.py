import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")


def send_welcome_email(
    to_email: str,
    customer_name: str
):
    login_url = os.getenv(
        "FRONTEND_URL",
        "http://localhost:3000/login"
    )

    html = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NEDS Agent</title>
</head>

<body style="margin:0;padding:0;background:#060b16;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 18px;">

<table width="620" cellpadding="0" cellspacing="0"
style="
max-width:620px;
background:#0f172a;
border-radius:24px;
overflow:hidden;
border:1px solid #1e293b;
box-shadow:0 20px 60px rgba(0,0,0,0.45);
">

<!-- HEADER -->
<tr>
<td style="
padding:48px 30px;
text-align:center;
background:linear-gradient(135deg,#2563eb,#22d3ee);
">
<h1 style="
margin:0;
font-size:38px;
color:#ffffff;
font-weight:800;
">
NEDS Agent
</h1>

<p style="
margin:12px 0 0;
color:#e0f2fe;
font-size:15px;
">
Plataforma de Atendimento Inteligente
</p>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:38px;">

<h2 style="
margin:0 0 18px;
font-size:30px;
color:#ffffff;
">
Bem-vindo, {customer_name} 👋
</h2>

<p style="
margin:0 0 14px;
font-size:17px;
line-height:1.7;
color:#cbd5e1;
">
Seu acesso ao <strong>NEDS Agent</strong> foi liberado com sucesso.
</p>

<p style="
margin:0 0 28px;
font-size:16px;
line-height:1.7;
color:#94a3b8;
">
Agora você pode automatizar atendimentos, conectar seu WhatsApp
e escalar seu negócio com uma operação profissional.
</p>

<!-- BOTÃO -->
<div style="text-align:center;margin:34px 0;">
<a href="{login_url}"
style="
display:inline-block;
padding:16px 34px;
border-radius:14px;
background:linear-gradient(135deg,#2563eb,#22d3ee);
color:#ffffff;
font-size:16px;
font-weight:bold;
text-decoration:none;
">
Acessar Painel Agora →
</a>
</div>

<!-- BENEFÍCIOS -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
<tr>

<td width="33%" style="padding:8px;">
<div style="
background:#111827;
border:1px solid #1f2937;
border-radius:16px;
padding:18px;
text-align:center;
">
<div style="font-size:26px;">⚡</div>
<p style="margin:10px 0 0;color:#fff;font-size:14px;">
Fluxos Automáticos
</p>
</div>
</td>

<td width="33%" style="padding:8px;">
<div style="
background:#111827;
border:1px solid #1f2937;
border-radius:16px;
padding:18px;
text-align:center;
">
<div style="font-size:26px;">💬</div>
<p style="margin:10px 0 0;color:#fff;font-size:14px;">
Atendimento 24h
</p>
</div>
</td>

<td width="33%" style="padding:8px;">
<div style="
background:#111827;
border:1px solid #1f2937;
border-radius:16px;
padding:18px;
text-align:center;
">
<div style="font-size:26px;">📈</div>
<p style="margin:10px 0 0;color:#fff;font-size:14px;">
Escala de Vendas
</p>
</div>
</td>

</tr>
</table>

<!-- PASSOS -->
<div style="
margin-top:28px;
padding:22px;
background:#081225;
border:1px solid #172554;
border-radius:16px;
">

<p style="
margin:0 0 12px;
font-size:15px;
font-weight:bold;
color:#ffffff;
">
Próximos passos:
</p>

<p style="margin:6px 0;color:#94a3b8;font-size:14px;">
1. Faça login na plataforma
</p>

<p style="margin:6px 0;color:#94a3b8;font-size:14px;">
2. Conecte seu WhatsApp
</p>

<p style="margin:6px 0;color:#94a3b8;font-size:14px;">
3. Crie seu primeiro fluxo
</p>

</div>

<!-- SUPORTE -->
<div style="
margin-top:26px;
padding:18px;
background:#111827;
border-radius:14px;
color:#94a3b8;
font-size:14px;
line-height:1.6;
">
Se precisar de ajuda, nossa equipe está pronta para atender você.
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="
padding:22px;
text-align:center;
font-size:12px;
color:#64748b;
border-top:1px solid #1e293b;
">
© 2026 NEDS Services · Todos os direitos reservados
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
"""

    resend.Emails.send({
        "from": "NEDS Agent <onboarding@resend.dev>",
        "to": [to_email],
        "subject": "Seu acesso ao NEDS Agent foi liberado 🚀",
        "html": html
    })