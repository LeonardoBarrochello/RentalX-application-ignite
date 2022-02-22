import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
                this.client = transporter;
            })
            .catch((err) => console.error(err));
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
            from: "Rentx <noreply@rentx.com.br>",
            subject,
            html: templateHTML,
        };

        const message = await this.client.sendMail(mailOptions);

        console.log("Message sent: %s", message.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
