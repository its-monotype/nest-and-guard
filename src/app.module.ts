import { AndGuard } from '@nest-lab/or-guard';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    LocalAuthGuard,
    RolesGuard,
    {
      provide: 'LocalAuthAndRolesGuard',
      useClass: AndGuard([LocalAuthGuard, RolesGuard]),
    },
  ],
})
export class AppModule {}
