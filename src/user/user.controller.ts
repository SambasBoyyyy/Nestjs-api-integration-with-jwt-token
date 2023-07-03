import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
 @UseGuards(AuthGuard('jwt'))
 @Get('me')
 getme(@Req() user: User ){
    console.log({
        user : user,
    })
    return 'gotiit';
 }

}