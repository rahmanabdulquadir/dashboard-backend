import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);           
  }

  @Post('login')
  @ApiBody({ type: LoginDto }) 
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
