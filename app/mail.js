const nodemailer = require("nodemailer");

const Email = {
    Enviar: async (de, para, assunto, msg) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "",
                pass: "",
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Jorge Souza 👻" <fragatasoftware@outlook.com>',
            to: "jorge.sos777@outlook.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
        return "Message sent: %s", info.messageId;
    }
};
module.exports.Email = Email;