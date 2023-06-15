import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-saml';
import { User } from '../models/user';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super({
      issuer:
        'https://app.onelogin.com/saml/metadata/8b3f00a8-493e-4398-9bc3-bc7530207cb7',
      callbackUrl: 'localhost:3000/v1/auth/sso/saml/callback',
      cert: 'MIID5TCCAs2gAwIBAgIUdpuWuPO1oxVVrkZ35tn9830RZ+cwDQYJKoZIhvcNAQEFBQAwSDETMBEGA1UECgwKSG9wcHNjb3RjaDEVMBMGA1UECwwMT25lTG9naW4gSWRQMRowGAYDVQQDDBFPbmVMb2dpbiBBY2NvdW50IDAeFw0yMzA2MTMxMTU3MjVaFw0yODA2MTMxMTU3MjVaMEgxEzARBgNVBAoMCkhvcHBzY290Y2gxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEaMBgGA1UEAwwRT25lTG9naW4gQWNjb3VudCAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCef4H515ey39Lq2/hHYG0mPbs9RKcz5epC3O2Asfc+8OAMGt6c9AUauGBNU0UoJyopirsYNwS//40pmzST19aUNY/hiKMSqcG0MewZ2FXgS6GQLU2/3dZkPN9wUCRy7S945lk3wuljJnJ5gT+jmpk4hCF8FZp1DULUvBiNQjef4oFPWUuvocXbkXl9P/0CZ+egBZYcl9BD7e+GywT/Kvj/M0q3cmnP+fPjC1PqU30YoSSqs3pBeL34UEi8vo8IA7owM4Pgxwz4Z+E4h6y8d1ROwQ5elDVUjC4ONljSPD+x0BYygkErGTve+sNxQlrZeetzzla4VdsWF+cnxeVaw/d5AgMBAAGjgcYwgcMwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUuYIRXw/Ut5d6CrpomRsnT3108RswgYMGA1UdIwR8MHqAFLmCEV8P1LeXegq6aJkbJ099dPEboUykSjBIMRMwEQYDVQQKDApIb3Bwc2NvdGNoMRUwEwYDVQQLDAxPbmVMb2dpbiBJZFAxGjAYBgNVBAMMEU9uZUxvZ2luIEFjY291bnQgghR2m5a487WjFVWuRnfm2f3zfRFn5zAOBgNVHQ8BAf8EBAMCB4AwDQYJKoZIhvcNAQEFBQADggEBAEWd5toIw7uJvcQswsPOsbhjIugDv0r4l+wWIbRdo7CJoogNgbePrMqgYSEKNQL7mAbmJWFT+aQ9zagKx/dAKj1SimX2jqHhBCN5ipJERw1McH6wX2y/yn/0a69KkioUa3LuDW8n1tOI5FQmmNdSIMUiXO7SXWOLnRJN98QRXOXWiN9DQE9WgZ225Dz3/rDhjuuvLw5WFXU5WOUXq9ZR2k96ojtCfNp5FmJkTuXt1oY+dervALqt1jA+hScDQyxuo615xdC6KZQCbn1wGPzYnixH4TC7IdzHEKlVEeBjZFt9rK/SxXZDA36MQFUvV1NSYLKC+fnKGXrqsLfp5S6LWnQ=',
      entryPoint:
        'https://arif-dev.onelogin.com/trust/saml2/http-post/sso/8b3f00a8-493e-4398-9bc3-bc7530207cb7',
      wantAssertionsSigned: true,
    });
  }

  async validate(profile: Profile, done) {
    try {
      console.log('========= profile:', profile);

      const user: User = {
        username: null,
        email: profile.nameID as string,
        issuer: profile.issuer as string,
        phone: null,
      };
      return user;
    } catch (e) {
      throw new ForbiddenException('invalid user attributes');
    }
  }
}
