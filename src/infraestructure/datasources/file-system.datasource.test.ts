import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';
describe('file-system.datasource.test.ts', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    test('should create log files if they do not exists', () => {

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])

    })

    test('should save a log in logs-all.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogServerityLevel.low,
            origin: 'file-system.datasoruce.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-medium.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogServerityLevel.medium,
            origin: 'file-system.datasoruce.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));

    });


    test('should save a log in logs-all.log and logs-high.log', () => {
        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogServerityLevel.high,
            origin: 'file-system.datasoruce.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });


    test('should return all logs ', async () => {

        const logDatasource = new FileSystemDataSource();
        const logLow = new LogEntity({
            message: 'log-low',
            level: LogServerityLevel.low,
            origin: 'low'
        });
        const mediumLow = new LogEntity({
            message: 'medium-low',
            level: LogServerityLevel.medium,
            origin: 'medium'
        });
        const highLow = new LogEntity({
            message: 'high-low',
            level: LogServerityLevel.high,
            origin: 'high'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(mediumLow);
        await logDatasource.saveLog(highLow);

        const logsLow = await logDatasource.getLogs(LogServerityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogServerityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogServerityLevel. high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, mediumLow, highLow]));
        expect(logsMedium).toEqual(expect.arrayContaining([mediumLow]));
        expect(logsHigh).toEqual(expect.arrayContaining([highLow]));

    });

    


})
