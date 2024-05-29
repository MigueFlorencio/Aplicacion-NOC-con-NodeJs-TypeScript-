import { LogModel } from "../../data/mongo";
import { LogEntity, LogServerityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log-datasource";




export class MongoLogDatasource implements LogDatasource{
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        // await newLog.save();
        console.log('Mongo Log created:', newLog.id);
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel 
        });

        return logs.map( mogoLog => LogEntity.fromObject(mogoLog));
    }

}