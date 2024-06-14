import { getServerSession } from "next-auth";
import userModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        if (!session || !session.user) {
            return Response.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }
        const userId = new mongoose.Types.ObjectId(user._id);
        const uSer = await userModel.aggregate([
            {
                $match: { _id: userId }
            },
            {
                $unwind: '$message'
            },
            {
                $sort: { 'message.createdAt': -1 }
            }, {
                $group: { _id: '$_id', messages: { $push: '$message' } }
            }
        ]).exec();
        if (!uSer || uSer.length === 0) {
            return Response.json(
                { message: 'User not found', success: false },
                { status: 404 }
            );
        }

        return Response.json(
            { messages: uSer[0].messages },
            {
                status: 200,
            }
        );

    }
    catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}