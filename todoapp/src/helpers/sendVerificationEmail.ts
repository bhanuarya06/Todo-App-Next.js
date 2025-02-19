import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail (email:string, username:string, otp:string ) : Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'TodoApp@resend.dev',
            to: [email],
            subject: "Verification email",
            react: VerificationEmail({email,otp})
        });
        return {
            success: true,
            message: "Sending Verification email successfull"
        }
    } catch (error) {
        return {
            success: false,
            message: "Sending Verification email failed"
        }
    }
}