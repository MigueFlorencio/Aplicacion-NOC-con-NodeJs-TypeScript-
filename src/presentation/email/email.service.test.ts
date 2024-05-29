import { EmailService, SendMailOptions } from "./email.service"
import nodemailer from 'nodemailer';



describe('email.service.test.ts', () => {

    const mockSentMail = jest.fn();

    //Mock a createTransport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSentMail
    });

    const emailService = new EmailService();
  
    test('should send email', async () => {
      


        const options: SendMailOptions = {
            to: 'migue18052000@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        const emailSent = await emailService.sendEmail(options);

        expect(mockSentMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>Test</h1>",
            "subject": "Test",
            "to": "migue18052000@gmail.com",
        })

        // expect(emailSent).toBe(true);


    })

    test('should send email with attachements', async () => {

        const email = 'migueflorencio@google.com';
      
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSentMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            ])
        })
    })
    
    
})
