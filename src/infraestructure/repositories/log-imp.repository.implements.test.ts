import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log-imp.repository.impl"

describe('log-imp-repository.implements.test.ts', () => {

    const mockLogDtasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }


    const logRepository = new LogRepositoryImpl(mockLogDtasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })
  
    test('saveLog should call the datasource with arguments ', async () => {
      
        const log = {level: LogServerityLevel.high, message: 'Hola'} as LogEntity;
        await logRepository.saveLog(log);
        expect(mockLogDtasource.saveLog).toHaveBeenCalledWith(log);
    })

    test('getLogs should call the datasource with arguments ', async () => {
      
        await logRepository.getLogs(LogServerityLevel.low);
        expect(mockLogDtasource.getLogs).toHaveBeenLastCalledWith(LogServerityLevel.low);

    })
    
})
