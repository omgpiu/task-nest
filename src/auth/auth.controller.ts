import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/singup')
  singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.singUp(authCredentialsDto);
  }

  @Post('/singin')
  singIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtInterface> {
    return this.authService.singIn(authCredentialsDto);
  }
}
