import {Html,Head,Preview,Heading,Row,Section,Text,Body,Button} from "@react-email/components";

interface verifyEmailProps {
    email: string;
    otp: string;
}

export default function VerificationEmail({email, otp}: verifyEmailProps) {
    return (
        <Html lang="en">
            <Head>
                <Preview>Verify your email</Preview>
            </Head>
            <Body>
                <Section>
                    <Row>
                        <Heading>Hi {email},</Heading>
                    </Row>
                    <Row>
                        <Text>Thank you for signing up with us. Please verify your email by clicking the button below.</Text>
                    </Row>
                    <Row>
                        <Text>{otp}</Text>
                    </Row>
                    <Row>
                        <Button href={`http://localhost:3000/verify/${otp}`}>Verify Email</Button>
                    </Row>
                </Section>
            </Body>
        </Html>
    )
}