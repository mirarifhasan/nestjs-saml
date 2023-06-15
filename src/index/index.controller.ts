import { Controller, Get } from '@nestjs/common';
import path from 'path';

@Controller()
export class IndexController {
  constructor() {}

  @Get()
  index() {
    return { message: 'Hello World' };
  }
}
