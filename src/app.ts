import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';


(async () => {
    await main();
})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });


    // const prisma = new PrismaClient();
    // const newLo = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // console.log(newLo);

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs);
    
    

    // Crear collection = tables, document = registro 
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);
    
    

    Server.start();
    // console.log(envs);
    
}