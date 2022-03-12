import sgMail from "@sendgrid/mail";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import sendgrid from "nodemailer-sendgrid";

import { IMailProvider } from "../IMailProvider";

class SendGridMailProvider implements IMailProvider {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf8"); // le o arquivo resultante do path passado como parametro

        const templateParse = handlebars.compile(templateFileContent); // passa o conteudo do arquivo pro parse do template engine

        const templateHTML = templateParse(variables); // passa as variaveis para o parse para substituir

        const mailOptions = {
            to,
            from: "rentxapp@gmail.com",
            subject,
            html: templateHTML,
        };

        sgMail
            .send(mailOptions)
            .then(() => {
                console.log("Email sent");
            })
            .catch((error) => {
                console.log(error.response.body.errors);
            });
    }
}

export { SendGridMailProvider };
