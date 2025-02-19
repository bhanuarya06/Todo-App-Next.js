import mongoose, {Schema, Document} from 'mongoose';

export interface User extends Document{
    username: string,
    password: string,
    email: string,
    otp:string,
    isVerified:boolean,
    otpExpiry:Date
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:[true, "password is required"],
    },
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"],
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    otp:{
        type:String,
        unique:[true, "otp is required"],
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otpExpiry:{
        type:Date,
        required:[true, "verify code expiry is required"]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;