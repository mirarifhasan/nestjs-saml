import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SamlAuthGuard } from 'src/guards/saml-auth.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor() {}

  @Get('sso/saml/login')
  @UseGuards(SamlAuthGuard)
  login() {
    console.log('===============', 'login controller');
    return;
    // return { message: 'Hello SAML!' };
  }

  @Post('sso/saml/callback')
  @UseGuards(SamlAuthGuard)
  samlCallback(@Req() req: Request) {
    console.log('===============', 'callback controller');
    console.log('===============', req);
    return { message: 'Hello SAML Callback!' };
  }

  @Get('sso/saml/logout')
  @UseGuards(SamlAuthGuard)
  logout() {
    console.log('===============', 'logout controller');
    // return;
    return { message: 'Hello SAML Logout!' };
  }
}
