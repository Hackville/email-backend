import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth-service';
import { CreateUserDto } from './dto/user.Dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
       
      await this.authService.register(createUserDto);
      return res.status(HttpStatus.CREATED).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Registration failed' });
    }
  }
  

  @Post('login')
  async login(@Body() loginUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const token = await this.authService.login(loginUserDto);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
  }
}
