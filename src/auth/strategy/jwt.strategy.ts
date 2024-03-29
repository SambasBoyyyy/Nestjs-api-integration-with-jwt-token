import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config : ConfigService ,private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

// to get env things need Config part

  async validate(payload: {sub: number;email:string }) {
   //finding data from data through orm
const user = await this.prisma.user.findUnique({
  where:{
     id:payload.sub,     
    email: payload.email
  }
})
    delete user.hash
    return user;
  }


}

