import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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
  samlCallback(@Req() req: any, @Res() res: any) {
    console.log('===============', 'callback controller');
    console.log('===============', req);
    console.log('===============', req.body.RelayState);

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
