export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { BOT_TOKEN, ADMIN_CHAT_ID } = process.env;

    const payload = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    if (BOT_TOKEN && ADMIN_CHAT_ID) {
      const telegramMessage = [
        '*New loan application*',
        `*Name:* ${body.firstName || ''} ${body.lastName || ''}`,
        `*Email:* ${body.email || ''}`,
        `*Phone:* ${body.phone || ''}`,
        `*Loan amount:* $${Number(body.loanAmount || 0).toLocaleString()}`,
        `*Monthly income:* ${body.monthlyIncome || ''}`,
        `*Purpose:* ${body.purpose || ''}`,
        `*Employment:* ${body.employmentStatus || ''}`,
        `*Address:* ${body.address || ''}`,
        `*City:* ${body.city || ''}`,
      ].join('\n');

      const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });

      const telegramData = await telegramResponse.json();

      if (!telegramResponse.ok || !telegramData.ok) {
        console.error('Telegram error', telegramData);
      }
    }

    return Response.json({ ok: true, payload });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, message: 'Unable to process request' }, { status: 500 });
  }
}
