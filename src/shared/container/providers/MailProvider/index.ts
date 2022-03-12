import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SendGridMailProvider } from "./implementations/SendGridMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
    sendgrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
