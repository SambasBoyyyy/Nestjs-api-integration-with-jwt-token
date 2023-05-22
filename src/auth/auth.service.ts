import { ForbiddenException, Injectable } from "@nestjs/common";
import { User,Bookmark, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

@Injectable()

export class AuthService{

    constructor(private prisma:PrismaService){}

async signup(dto: AuthDto){

const hash = await argon.hash(dto.password)

try {
    const user = await this.prisma.user.create({
        data:{
            email:dto.email,
            hash,
        }
       
    });
    
    //for not showing password in response
     delete user.hash
    
        return user;
} 

catch (error) {
     

    if(error.code == 'P2002' && error instanceof Prisma.PrismaClientKnownRequestError){
            throw  new ForbiddenException('Credentials taken');
      
       
    }
    throw error;
 
}


}    

signin(dto: AuthDto){
    return {msg: 'Signed in'}
}






}
 