import { getServerSession } from "next-auth";
import userModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(request:Request,{params}:{params:{messageid:string}}){
  const messageId =params.messageid
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
       const updated =await userModel.updateOne({
        _id:user._id
       },{
        $pull:{message:{_id:messageId}}
       })
        if(updated.modifiedCount==0){
          return Response.json(
            { success: false, message: 'Not found' },
            { status: 401 }
          );
        }
        
        return Response.json(
          { success: true, message: 'Message Deleted' },
          { status: 201 }
        );
} catch (error) {
    console.error('Error updating message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error Deleting message ' },
      { status: 500 }
    );
  }
}

