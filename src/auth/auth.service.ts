import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id, privilege: user.privilege };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }  async register(createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    const userObj = (user as any).toObject ? (user as any).toObject() : user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userObj;
    return result;
  }
}
