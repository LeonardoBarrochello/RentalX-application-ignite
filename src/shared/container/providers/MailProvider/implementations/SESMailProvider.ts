import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            }),
        });
    }

    async sendMail(
        to: string,
        subject: string,
        variables: object,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf8"); // le o arquivo resultante do path passado como parametro

        const templateParse = handlebars.compile(templateFileContent); // passa o conteudo do arquivo pro parse do template engine

        const templateHTML = templateParse(variables); // passa as variaveis para o parse para substituir

        const mailOptions = {
            to,
            from: "Rentx <noreply@rentx.com.br>",
            subject,
            html: templateHTML,
        };

        const message = await this.client.sendMail(mailOptions);

        console.log("Message sent: %s", message.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export { SESMailProvider };
