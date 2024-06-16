import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from 'nodemailer'
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
      
        const transporter = nodemailer.createTransport({
        
            service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
            port: 465,
            auth: {
                user: process.env.EMAIL_KEY, // Your email address
                pass: process.env.EMAIL_PASSWORD_KEY // Your email password or app-specific password
            },
        });
        const mailOptions = {
            from: 'theprofessorsergio8@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Mystery Message Verification Code', // Subject line
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
                <title>Verification Code</title>
                <style>
                  @font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    mso-font-alt: 'Verdana';
                    src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
                  }
          
                  * {
                    font-family: 'Roboto', Verdana;
                  }
                </style>
              </head>
              <body>
                <div>
                  <h2>Hello, ${username},</h2>
                  <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
                  <p>${verifyCode}</p>
                  <p>If you did not request this code, please ignore this email.</p>
                </div>
              </body>
              </html>
            `,
          };
const mailResponse = await transporter.sendMail(mailOptions);
// await resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: email,
//   subject: 'Mystery Message Verification Code',
//   react: VerificationEmail({ username, otp: verifyCode }),
// });
return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
}
}



// //import User from '@/models/user.model';
// import nodemailer from 'nodemailer'
// import bcrypt from 'bcryptjs'
// export const sendEmail =async({email,emailType,userId}:any)=>{
//     const hashToken=await bcrypt.hash(userId.toString(),10);
//     if(emailType==="Verify") {
//         await User.findByIdAndUpdate(
//             userId,{$set:{verifytoken:hashToken,verifytokenexpiry:Date.now()+3600000}})
//     }
//     else if(emailType==="Reset"){
//         await User.findByIdAndUpdate(
//             userId,{$set:{forgotpasswordtoken:hashToken,forgotpasswordtokenexpiry:Date.now()+3600000}})
//     }
//     try {
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
//     port: 465,
//     auth: {
//         user: "theprofessorsergio8@gmail.com", // Your email address
//         pass: "jdkimiwfwvhaumhm" // Your email password or app-specific password
//     },
//   });
//           const emailHtml =emailType==="Verify" ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to verify your email.</p> <br/> <p>token is ${hashToken}<p/>  `:`<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashToken}">here</a> to Reset Your password.<br/> <p>token is ${hashToken}<p/>  `

//           const mailOptions ={
//             from: 'theprofessorsergio8@gmail.com', // sender address
//             to: email, // list of receivers
//             subject: emailType ==='Verify' ?"Verify Your Email" :"Reset Your Password", // Subject line
//             html:emailHtml, // html body
//           }
//           const mailResponse =await transporter.sendMail(mailOptions)
//           return mailResponse;
//     } catch (error:any) {
//         throw new Error(error.message)
//     }
// }