import { LogEntity, LogServerityLevel } from "./log.entity"

describe('LogEntity', () => { 
    
    const dataObj ={
        message:'Hola mundo',
        level: LogServerityLevel.high,
        origin: 'log.entity.ts'
    };

    test('should create a LOgEntity instance', () => {
      

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from json', () => {
      
        const json = `{"message":"Service https://google.com working","level":"low","createAt":"2024-03-28T05:40:30.596Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogServerityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instance from Object ', () => {
        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createAt).toBeInstanceOf(Date);
    })
    
    
    
 })