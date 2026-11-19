import { NextRequest, NextResponse } from "next/server";
import { resend } from "../../../lib/resend";
import RealEstateInquiryEmail from "../../../components/emails/InqueryEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      ownerEmail,
      ownerName,
      propertyTitle,
      propertyPrice,
      senderName,
      senderEmail,
      message,
      senderPhone,
    } = body;

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: ownerEmail,
      subject: `Property Inquiry from ${senderName}`,
      react: RealEstateInquiryEmail({
        ownerName,
        propertyTitle,
        propertyPrice,
        senderName,
        senderEmail,
        senderPhone,
        message,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failid to send email",
      },
      {
        status: 500,
      },
    );
  }
}
