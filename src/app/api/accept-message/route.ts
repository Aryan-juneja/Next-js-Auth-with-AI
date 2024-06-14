import { getServerSession } from "next-auth";
import userModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function POST(request:Request){
    await dbConnect();
try {
        const session =await getServerSession(authOptions);
        const user =session?.user;
        if (!session || !session.user) {
            return Response.json(
              { success: false, message: 'Not authenticated' },
              { status: 401 }
            );
          }
        const userId =user._id;
        const {acceptingMessage} =await request.json();
        console.log(acceptingMessage)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptingMessage },
            { new: true }
          );
      
          if (!updatedUser) {
            // User not found
            return Response.json(
              {
                success: false,
                message: 'Unable to find user to update message acceptance status',
              },
              { status: 404 }
            );
          }
      
          // Successfully updated message acceptance status
          return Response.json(
            {
              success: true,
              message: 'Message acceptance status updated successfully',
              updatedUser,
            },
            { status: 200 }
          );
    
} catch (error) {
    console.error('Error updating message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error updating message acceptance status' },
      { status: 500 }
    );
  }
}

export async function GET(request:Request){
    await dbConnect();
    try {
            const session =await getServerSession(authOptions);
            const user =session?.user;
            if (!session || !session.user) {
                return Response.json(
                  { success: false, message: 'Not authenticated' },
                  { status: 401 }
                );
              }
            const userId =user._id;
            const foundUser = await userModel.findById(user._id);

            if (!foundUser) {
              // User not found
              return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
              );
            }
        
            // Return the user's message acceptance status
            return Response.json(
              {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessage,
              },
              { status: 200 }
            );
          } catch (error) {
            console.error('Error retrieving message acceptance status:', error);
            return Response.json(
              { success: false, message: 'Error retrieving message acceptance status' },
              { status: 500 }
            );}
}