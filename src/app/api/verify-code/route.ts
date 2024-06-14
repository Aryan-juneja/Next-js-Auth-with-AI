import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json();
        const user = await userModel.findOne({ username })
        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }
        const verify = user.verifyCode === code
        const expiry = new Date(user.verifyCodeExpiry) > new Date();
        if (verify && expiry) {
            user.isVerified = true;
            await user.save();

            return Response.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );
        }
        else if (!expiry) {
            // Code has expired
            return Response.json(
                {
                    success: false,
                    message:
                        'Verification code has expired. Please sign up again to get a new code.',
                },
                { status: 400 }
            );
        }
        else {
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return Response.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}