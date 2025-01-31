import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Services } from '../common/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.NATS_SERVICE) private readonly clint: ClientProxy,
  ) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.clint.send('auth.register.user', registerUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginUserDto) {
    return this.clint.send('auth.login.user', loginDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyToken(@User() user: CurrentUser, @Token() token: string) {
    // const user = req['user'];
    // const token = req['token'];
    return { user, token };
    // return this.clint.send('auth.verify.token', {}).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );
  }
}
