import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async singIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtInterface> {
    const res = await this.usersRepository.singIn(authCredentialsDto);
    if (typeof res === 'string') {
      const { username }: JwtPayload = authCredentialsDto;
      const accessToken = this.jwtService.sign({ username });
      return { accessToken };
    }
    return res;
  }
}
