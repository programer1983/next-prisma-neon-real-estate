import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";
import { formatPrice } from "../../app/property/[propertyId]/page";

export interface InquiryEmailProps {
  ownerName?: string;
  propertyTitle?: string;
  propertyPrice?: string | number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  message?: string;
}

const RealEstateInquiryEmail = ({
  ownerName,
  propertyTitle,
  propertyPrice,
  senderName,
  senderEmail,
  senderPhone,
  message,
}: InquiryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {`New inquiry about ${propertyTitle} from ${senderName}`}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans my-auto mx-auto px-2">
          <Section>
            <Text>Dear {ownerName}</Text>
          </Section>

          <Container
            className="bg-white border border-solid border-gray-200 
            rounded-[8px] my-10 mx-auto p-8` max-w-150"
          >
            <Section className="mb-6`">
              <Heading className="text-[24px] font-bold text-gray-900 m-0">
                New Property Inquiry
              </Heading>
              <Text className="text-[14px] text-gray-500 mt-2 mb-0">
                Hi {ownerName}, you have received a new message regarding your
                listing.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />
            <Section className="mb-6">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-3">
                Property Details
              </Heading>
              <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                <strong>Property:</strong> {propertyTitle}
              </Text>
              {propertyPrice && (
                <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                  <strong>Price:</strong> {formatPrice(propertyPrice)}
                </Text>
              )}
            </Section>
            <Section className="mb-6">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-3">
                Contact Information
              </Heading>
              <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                <strong>Name:</strong> {senderName}
              </Text>
              {senderEmail && (
                <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                  <strong>Email:</strong>{" "}
                  <Link
                    href={`mailto:${senderEmail}`}
                    className="text-blue-600 underline"
                  >
                    {senderEmail}
                  </Link>
                </Text>
              )}
              {senderPhone && (
                <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                  <strong>Phone:</strong>{" "}
                  <Link
                    href={`tel:${senderPhone}`}
                    className="text-blue-600 underline"
                  >
                    {senderPhone}
                  </Link>
                </Text>
              )}
            </Section>
            <Section className="mb-8">
              <Heading className="text-[18px] font-semibold text-gray-900 mb-3">
                Message
              </Heading>
              <Text className="text-[14px] text-gray-700 leading-5.5 m-0">
                {message}
              </Text>
            </Section>
            <Section className="text-center mb-8">
              {senderEmail ? (
                <Button
                  href={`mailto:${senderEmail}?subject=${encodeURIComponent(
                    `Re: Inquiry about ${propertyTitle}`,
                  )}`}
                  className="bg-blue-600 text-white font-semibold text-[14px] 
                  px-6 py-3 rounded-[6px] no-underline inline-block"
                >
                  Reply via Email
                </Button>
              ) : (
                senderPhone && (
                  <Button
                    href={`tel:${senderPhone}`}
                    className="bg-blue-600 text-white font-semibold text-[14px] 
                    px-6 py-3 rounded-[6px] no-underline inline-block"
                  >
                    Call {senderName}
                  </Button>
                )
              )}
            </Section>

            <Hr className="border-gray-200 my-6" />
            <Section>
              <Text className="text-[12px] text-gray-500 leading-4.5 text-center m-0">
                This email was automatically generated from your real estate
                platform.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RealEstateInquiryEmail;
