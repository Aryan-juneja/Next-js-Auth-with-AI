import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User.model";
import {z} from 'zod'
import {usernameValidation} from  '@/schemas/signUpSchema'

const usernameSchema =z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect();

    try {
        const {searchParams } =new URL(request.url);
        const params ={
            username:searchParams.get('username')
        }
        const verifiedUsername = usernameSchema.safeParse(params);
        if(!verifiedUsername.success) {

            const usernameErrors = verifiedUsername.error.format().username?._errors || [];
            return Response.json(
              {
                success: false,
                message:
                  usernameErrors?.length > 0
                    ? usernameErrors.join(', ')
                    : 'Invalid query parameters',
              },
              { status: 400 }
            ); 
        }
        const { username } = verifiedUsername.data;
        const user = await userModel.findOne({username});
        if(user && user.isVerified) {
            return Response.json(
                {
                  success: false,
                  message: 'Username is already taken',
                },
                { status: 400 }
              );
        }
        else {
            return Response.json(
                {
                  success: true,
                  message: 'Username is unique',
                },
                { status: 200 }
              );
        }
    } catch (error) {
        console.error('Error checking username:', error);
        return Response.json(
          {
            success: false,
            message: 'Error checking username',
          },
          { status: 500 }
        );
      }
}