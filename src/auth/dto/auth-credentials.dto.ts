import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEXP } from '../../helpers/regexp';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(PASSWORD_REGEXP, {
    message: 'password is too weak',
  })
  password: string;
}
