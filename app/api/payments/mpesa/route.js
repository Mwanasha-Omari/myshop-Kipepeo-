import axios from "axios";

export async function POST(req) {
  const { phone, amount } = await req.json();
  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ":" + process.env.MPESA_CONSUMER_SECRET
  ).toString("base64");

  const tokenRes = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const access_token = tokenRes.data.access_token;

  const stkRes = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: "174379",
      Password: "YOUR_PASSWORD",
      Timestamp: "YOUR_TIMESTAMP",
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: "174379",
      PhoneNumber: phone,
      CallBackURL: "https://yourdomain.com/api/callback",
      AccountReference: "MyShop",
      TransactionDesc: "Payment",
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return Response.json(stkRes.data);
}