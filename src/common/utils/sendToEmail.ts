import { InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";

type SendToEmail = {
    email: string;
    subject: string;
    text: string;
    html: string;
};

export const sendToEmail = async ({ email, subject, text, html }: SendToEmail) => {
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
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        html: `${html} `, // html body
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
