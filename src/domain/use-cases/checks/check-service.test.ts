import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service"

describe('chek-service.test.ts', () => { 
    

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServcice = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallBack when fetch returns true', async () => {
      

        const wasOk = await checkServcice.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })

    test('should call successCallBack when fetch returns false', async () => {
      

        const wasOk = await checkServcice.execute('https://gooooooooooosiudydfjgle.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })
    
 })