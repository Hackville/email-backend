import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/userEntity';
import { AuthService } from './auth-service';
// import { UserRepository } from './user-repository';
import { AuthController } from './auth-controller';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db4free.net',
      port: 3306,
      username: 'lutitech',
      password: 'Luti4148',
      database: 'movittt',
      entities: [User],
      synchronize: true, // Set to false in production
    }),
    JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '1h' },
      }), // Add JwtModule here
    ],
  controllers:[AuthController],
  providers: [ AuthService]
})
export class AuthModule {}
