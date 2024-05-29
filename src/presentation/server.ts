import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log-imp.repository.impl";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogServerityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from '../infraestructure/datasources/postres-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        //todo: Mandar EMAIL


        // emailService.sendEmailWithFileSystemLogs(
        //     ['migueflorencioi@gmail.com', 'learnenglish1805@gmail.com']
        // );

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['migueflorencioi@gmail.com', 'learnenglish1805@gmail.com']
        // )

        // const logs = await logRepository.getLogs(LogServerityLevel.low);
        // console.log(logs);
        

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         // const url = 'http://localhost:3000/posts';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, postgresLogRepository, mongoLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error),
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     }

        // );
    }
}