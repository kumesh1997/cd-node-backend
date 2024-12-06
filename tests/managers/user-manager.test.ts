import { userManager } from "../../src/managers/user.manager";
import { userRepository } from "../../src/repository/user.repository";
import { ResponseData } from "../../src/types/responses/api-response.interface";
import { LoginResponseDto } from "../../src/types/responses/users/loginResponseDto";
import { User } from "../../src/types/models/user.model";

jest.mock("../../src/repository/user.repository");

describe("getById", () => {
    const userId = 1; 
    beforeEach(() => { 
    jest.clearAllMocks(); 
    }); 
    
    it('should return a user when userId exists', async () => { 
        const user: User = { "id": 1, "firstName": "Laptop", "lastName": "", "email" : "tharindukumesh09@gmail.com", "password": "1234"  }; 

        (userRepository.getById as jest.Mock).mockResolvedValue(user); 

        const result = await userManager.getById(userId); 
        expect(result).toEqual(user); 
    });

    it('should return null when userId does not exist', async () => { 
        (userRepository.getById as jest.Mock).mockResolvedValue(null); 
        
        const result = await userManager.getById(userId); 
        
        expect(result).toBeNull(); 
    });

});


describe("login", () => {
    const email = 'test@example.com'; 
    const password = 'password123'; 

    beforeEach(() => { 
        jest.clearAllMocks(); 
    });

    it('should return no email found', async () => {
        
        (userRepository.getByEmail as jest.Mock).mockResolvedValue(null); 
        
        const expectedResponse: ResponseData<LoginResponseDto | null> = { 
            success: false, 
            message: 'LOGIN_NO_EMIL_FOUND', 
            data: null, 
        }; 
        
        const result = await userManager.login(email, password); 
        
        expect(result).toEqual(expectedResponse); 
    });

    it('should return invalid credentials', async () => { 

        const user: User = { 
            id: 1, 
            firstName: "Laptop", 
            lastName: "", 
            email : "tharindukumesh09@gmail.com", 
            password: "1234" 
         }; 
        
        (userRepository.getByEmail as jest.Mock).mockResolvedValue(user);  
        
        jest.spyOn(userManager as any, 'compareUser').mockResolvedValue(false);
        
        const expectedResponse: ResponseData<LoginResponseDto | null> = { 
            success: false, 
            message: 'LOGIN_INVALID_CREDENTIALS', 
            data: null, }; 
            
            const result = await userManager.login(email, password); 
            
            expect(result).toEqual(expectedResponse); 
            expect(userRepository.getByEmail).toHaveBeenCalledWith(email); 
    });

    it('should return login successful', async () => { 
        
        const user: User = { 
            id: 1, 
            firstName: "Laptop", 
            lastName: "", 
            email : "tharindukumesh09@gmail.com", 
            password: "1234" 
         }; 

        const token = 'auth-token'; 
        
        (userRepository.getByEmail as jest.Mock).mockResolvedValue(user); 
        
        const compareUserSpy = jest.spyOn(userManager as any, 'compareUser').mockResolvedValue(true);

        const generateAuthTokenSpy = jest.spyOn(userManager as any, 'generateAuthToken').mockResolvedValue(token);
        
        const expectedResponse: ResponseData<LoginResponseDto | null> = { 
            success: true, 
            message: 'LOGIN_SUCCESSFULL', 
            data: { 
                id: user.id, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email, 
                token: token, 
            },
         }; 
         
         const result = await userManager.login(email, password); 
         
        //  expect(result).toEqual(expectedResponse); 
         expect(userRepository.getByEmail).toHaveBeenCalledWith(email);  
         expect(compareUserSpy).toHaveBeenCalledWith(email, password, user);
         expect(generateAuthTokenSpy).toHaveBeenCalledWith(user.id);
        });
});
