import EmailsServiceInterface from "../domain/authentication/interfaces/emails-service.interface";
import TokenEntity from "../domain/authentication/interfaces/token-entity.interface";
import UserEntity from "../domain/authentication/interfaces/user-entity.interface";
import nodemailer from 'nodemailer';
import config from '../environment/env.config';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class EmailsService implements EmailsServiceInterface {

    private transporter = nodemailer.createTransport({
        host: <string>config.EMAIL_HOST,
        port: <number>config.EMAIL_PORT,
        secure: false,
        auth: {
          user: <string>config.EMAIL_USER,
          pass: <string>config.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    private defaultHead = `
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title></title>
            <!--[if (mso 16)]>
                <style type="text/css">
                    a {text-decoration: none;}
                </style>
            <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        </head>
     `;

    private defaultHeader = `<h1>Bedrock</h1>`;

    sendAccountVerificationEmail(user: UserEntity, token: TokenEntity): Promise<any> {
        return new Promise((resolve, reject) => {
            const tokenLink = `${config.FRONT_URL}/auth/account-validation/${token.token}`;
            const htmlBody = `
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
                <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table  cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td class="esd-container-frame" width="560"  align="center">
                                            <table  cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-block-text es-m-txt-c es-p10b" align="left">
                                                            <h1 style="font-size: 20px;color:#28357C;text-align:center">Validez votre adresse email sur Bedrock</h1>
                                                            <p>Bonjour ${user.username && user.username !== '' ? user.username : user.email}</p>
                                                            <p>Pour activer votre compte, nous vous invitons à cliquer sur le lien ci-dessous:</p>
                                                            <p><a style="word-break: break-all;" href="${tokenLink}">${tokenLink}</a></p>
                                                        </td> 
                                                    </tr>
                                                    <tr style="border-collapse:collapse"> 
                                                        <td align="center" class="es-m-txt-c" style="padding-top:40px;padding-bottom:40px"> 
                                                            <span class="msohide es-button-border" style="border-style:solid;border-color:#1B2A2F;background-color:#28357C;border-width:0px;display:inline-block;border-radius:100px;width:auto;mso-hide:all"><a href="${tokenLink}" class="es-button msohide" target="_blank" style="mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#28357C;border-width:25px 40px 25px 40px;display:inline-block;background-color:#28357C;border-radius:100px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:600;font-style:normal;line-height:22px;width:auto;text-align:center;mso-hide:all;border-left-width:40px;border-right-width:40px">Confirmer mon compte</a></span> 
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td align="left" class="esd-block-text es-p40b">
                                                            <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;">Bien cordialement,</p>
                                                            <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;">Bedrock</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            `;
            const emailSubject = 'Bedrock - Confirmation de l\'adresse email';
            const emailPlainText = 'Bedrock - Confirmation de l\'adresse email';
            this.sendEmail(user.email, [], [], emailSubject, emailPlainText, htmlBody, (err: Error, response: SMTPTransport.SentMessageInfo) => {
                if (err) return reject(err);
                resolve(response);
            });
        });
    }

    sendResetPasswordEmail(user: UserEntity, token: TokenEntity): Promise<any> {
        return new Promise((resolve, reject) => {
            const tokenLink = `${config.FRONT_URL}/auth/reset-password/${token.token}`;
            const htmlBody = `
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
                <tbody>
                    <tr>
                        <td class="esd-stripe" align="center">
                            <table  cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td class="esd-container-frame" width="560"  align="center">
                                            <table  cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-block-text es-m-txt-c es-p10b" align="left">
                                                            <h1 style="font-size: 20px; color: #27357c">Votre mot de passe réinitialisé</h1>
                                                            <p>Bonjour ${user.username && user.username !== '' ? user.username : user.email},</p>
                                                            <p>La réinitialisation de votre mot de passe a été déclenchée depuis la fonction "Mot de passe oublié".</p>
                                                            <p>Veuillez mettre à jour votre de mot de passe en cliquant sur le lien suivant :</p>
                                                            <p>Attention ! Ce lien expire au bout de 2 heures.</p>
                                                        <td/>
                                                    </tr>  
                                                    <tr style="border-collapse:collapse"> 
                                                        <td align="center" class="es-m-txt-c" style="padding-top:40px;padding-bottom:40px"> 
                                                            <span class="msohide es-button-border" style="border-style:solid;border-color:#1B2A2F;background-color:#28357C;border-width:0px;display:inline-block;border-radius:100px;width:auto;mso-hide:all"><a href="${tokenLink}" class="es-button msohide" target="_blank" style="mso-style-priority:100 !important;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#28357C;border-width:25px 40px 25px 40px;display:inline-block;background-color:#28357C;border-radius:100px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:600;font-style:normal;line-height:22px;width:auto;text-align:center;mso-hide:all;border-left-width:40px;border-right-width:40px">Réinitialiser Mot de Passe</a></span> 
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><a style="word-break: break-all;" href="${tokenLink}">${tokenLink}</a></p>
                                                            <p>Si vous n'êtes pas à l'origine de cette action ou que vous n'en aviez pas été informé, veuillez ignorer cet e-mail.</p>
                                                            <p>Bien cordialement.</p>
                                                            <p>Bedrock</p>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            `;
            const emailSubject = 'Bedrock - Réinitialisation de votre mot de passe';
            const emailPlainText = 'Bedrock - Réinitialisation de votre mot de passe';
            this.sendEmail(user.email, [], [], emailSubject, emailPlainText, htmlBody, (err: Error, response: SMTPTransport.SentMessageInfo) => {
                if (err) return reject(err);
                resolve(response);
            });
        });
    }

    private sendEmail(to: string, cc: string[], bcc: string[], subject: string, plainText: string, htmlBody: string, callback: any): void {

        const mailOptions = {
            from: `"Bedrock - Ne pas répondre" <${config.EMAIL_USER}>`,
            to,
            cc,
            bcc,
            subject,
            text: plainText,
            html: ''
        };

        mailOptions.html = `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html>
                ${this.defaultHead}
                <body style="font-family: sans-serif;">
                    <div class="es-wrapper-color">
                        <!--[if gte mso 9]>
                            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                <v:fill type="tile" color="#f6f6f6"></v:fill>
                            </v:background>
                        <![endif]-->
                        <table class="es-wrapper"  cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-email-paddings" >
                                        ${this.defaultHeader}
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        ${htmlBody}
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
            </html>
        `;

        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error occurred. ' + err.message);
                console.log(err);
                callback(err, info);
                return process.exit(1);
            }
            callback(null, info);
        });
    }

}