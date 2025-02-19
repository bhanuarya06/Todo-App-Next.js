import dbCon from "@/lib/dbConnection";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST (req:Request){
    await dbCon();
    try {
        const {username, email, password} = await req.json();
        const verifyUserByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (verifyUserByUsername){
            return Response.json(
                {
                    success: false,
                    message: "Username already taken"
                },
                {
                    status: 500
                }
            )  
        }
        const verifyUserByEmail = await UserModel.findOne({email})
        const hashpassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setHours(otpExpiry.getHours()+ 1)
        if (verifyUserByEmail){
            if(verifyUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "User already registerd"
                    },
                    {
                        status: 500
                    }
                )
            }
            else{
                verifyUserByEmail.password = hashpassword,
                verifyUserByEmail.otp = otp,
                verifyUserByEmail.otpExpiry = otpExpiry
                await verifyUserByEmail.save();
            }
        }
        else{
            const newUser = new UserModel({
                username,
                password : hashpassword,
                email,
                otp : otp,
                isVerified: false,
                otpExpiry : otpExpiry
            });
            await newUser.save();
        }
        const verifyRes = await sendVerificationEmail(email,username,otp)
        console.log("msg: ",verifyRes.message)
        console.log("sucess: ",verifyRes.success)
        if (!verifyRes.success){
            return Response.json(
                {
                    success: false,
                    message: verifyRes.message
                },
                {
                    status: 500
                }
            )
        }
        else{
            return Response.json(
                {
                    success: true,
                    message: "User registerd successfully"
                },
                {
                    status: 200
                }
            )
        }
    } catch (error) {
        console.error("User registration failed");
        return Response.json(
            {
                success: false,
                message: "User registration failed"
            },
            {
                status: 500
            }
        )
    }
}