import { InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";

export const sendToSmtpTempPassword = async (email: string, code: string) => {
    console.log("🚀 ~ file: smtp.utils.ts ~ line 5 ~ sendToSmtpTempPassword ~ email", email);
    console.log("🚀 ~ file: smtp.utils.ts ~ line 5 ~ sendToSmtpTempPassword ~ code", code);
    console.log("🚀 ~ file: smtp.utils.ts ~ line 5 ~ env", process.env.GMAIL_EMAIL);
    console.log("🚀 ~ file: smtp.utils.ts ~ line 5 ~ env", process.env.GMAIL_PASSWORD);
    // node mailer
    const transporter = await nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    //CLIENT_APP
    const mailOptions = {
        from: `"<${process.env.GMAIL_EMAIL}>`, // sender address
        to: `${email}`, // ["@gmail.com","@gmail.com"] list of receivers
        subject: "Temporary Password", // Subject line
        text: `Your account is created by Admin at your request. Please change your password after login.`, // plain text body
        //  html with design
        html: `
        <div style="background-color: #f5f5f5; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                <div style="text-align: center;">
                    <img src="https://ph.joblum.com/uploads/22/21338.jpg" alt="logo" border="0" style="width: 100px; height: 100px;">
                </div>
                <h2 style="text-align: center; margin: 0px;">Your account is created by Admin at your request.</h2>
                <p style="text-align: center;">Your temporary password is <b>${code}</b>. Please change your password after login.</p>
            </div>
        </div>
        `, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            throw new InternalServerErrorException("Something went wrong");
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
