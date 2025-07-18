import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto, CreateUserDto } from '../user/user.dto';
import { Public } from './auth-decorators';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  createUser(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }
  @Public()
  @Post('login')
  loginUser(
    @Body() body: { email: string; password: string },
  ): Promise<AuthResponseDto> {
    return this.authService.login(body.email, body.password);
  }
}
