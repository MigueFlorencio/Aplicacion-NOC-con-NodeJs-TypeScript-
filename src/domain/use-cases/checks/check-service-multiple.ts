import { LogEntity, LogServerityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface ChceckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type ScuccesCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements ChceckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: ScuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){
    }

    private callLogs (log: LogEntity){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log);
        });
    }

    async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogServerityLevel.low,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.successCallback && this.successCallback();
            
            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogServerityLevel.high,
                origin: 'check-service.ts'
            });
            this.callLogs(log);

            this.errorCallback && this.errorCallback(`${error}`);
            return false
        }

    }
}