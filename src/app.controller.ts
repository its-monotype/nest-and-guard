import { AndGuard } from '@nest-lab/or-guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { UserRole } from './users/user-role.enum';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('admin')
  async adminLogin(@Request() req) {
    return req.user;
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AndGuard([LocalAuthGuard, RolesGuard]))
  @Post('admin/and-guard')
  async adminLoginWithAndGuard(@Request() req) {
    return req.user;
  }
}
