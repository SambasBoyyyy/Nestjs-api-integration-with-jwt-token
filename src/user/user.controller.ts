import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
 @UseGuards(AuthGuard('jwt'))
 @Get('me')
 getme(@Req() req: Request ){
    console.log({
        user : req.user,
    })
    return req.user;
 }

}