import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {
  constructor() {}

  @Get()
  index() {
    return { message: 'Hello World', login_path: '/v1/auth/sso/saml/login' };
  }
}
