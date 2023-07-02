import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
 @UseGuards(AuthGuard('jwt'))
 @Get('me')
 getme(/*@Req() req: Request*/ ){
    console.log({
        
    })
    return 'gotiit';
 }

}