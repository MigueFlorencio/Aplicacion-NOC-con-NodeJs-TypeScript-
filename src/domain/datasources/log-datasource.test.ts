import { LogEntity, LogServerityLevel } from "../entities/log.entity"
import { LogDatasource } from "./log-datasource"

describe('log-datasource.ts', () => { 

    const newLog = new LogEntity({
        origin: 'lod-datasorce.test.ts',
        message: 'test-message',
        level: LogServerityLevel.low
    })

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
}
    
    test('should test the abstract class', async () => { 
        
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.getLogs).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);
        
        const logs = await mockLogDatasource.getLogs(LogServerityLevel.high);

        expect( logs ).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
     })
 })