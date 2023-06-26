import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SamlAuthGuard extends AuthGuard('saml') {
  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return {
      additionalParams: {
        RelayState: req.query.redirect_uri ?? null,
      },
    };
  }
}
