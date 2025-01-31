import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Services } from '../common/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.NATS_SERVICE) private readonly clint: ClientProxy,
  ) {}

  @Post('register')
  async registerUser() {
    try {
      return await firstValueFrom(this.clint.send('auth.register.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser() {
    try {
      return await firstValueFrom(this.clint.send('auth.login.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyToken() {
    try {
      return await firstValueFrom(this.clint.send('auth.verify.token', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
