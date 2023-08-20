import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/user.Dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
   
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usererpo: Repository<User>
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // const user = {
    //   username,
    //   hashedPassword,
    // }
    const user = await this.usererpo.create({username, password: hashedPassword})
    const data= await this.usererpo.save(user);
    return data
  }

  async login(loginUserDto: CreateUserDto): Promise<string> {
    const { username, password } = loginUserDto;
    const user = await this.validateUserPassword(username, password);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = { sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async validateUserPassword(username: string, password: string): Promise<User | null> {
    const user = await this.usererpo.findOne({where:{ username }});

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
