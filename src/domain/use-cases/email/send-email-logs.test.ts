import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendEmailLogs } from "./send-email-logs"

describe('send-email-logs-test.ts', () => { 
    
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should coall sendEmail and savelog', async () => {
      

        const result = await sendEmailLogs.execute('migueflorencioi@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createAt": expect.any(Date),
            "level": "low",
            "message": "Log Email sent",
            "origin": "send-email-log.ts",
        })

    })

    test('should log in case of error', async () => {
      
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('migueflorencioi@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-log.ts",
        })

    })
    
 })