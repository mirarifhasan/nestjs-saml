import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
// import { Strategy, Profile } from 'passport-saml';
import { User } from '../models/user';
import { Profile, Strategy } from '@node-saml/passport-saml';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super({
      // OneLogin configuration
      issuer:
        'https://app.onelogin.com/saml/metadata/8b3f00a8-493e-4398-9bc3-bc7530207cb7',
      audience: 'nestjs-saml',
      callbackUrl: 'localhost:3000/v1/auth/sso/saml/callback',
      cert: 'MIID5TCCAs2gAwIBAgIUdpuWuPO1oxVVrkZ35tn9830RZ+cwDQYJKoZIhvcNAQEFBQAwSDETMBEGA1UECgwKSG9wcHNjb3RjaDEVMBMGA1UECwwMT25lTG9naW4gSWRQMRowGAYDVQQDDBFPbmVMb2dpbiBBY2NvdW50IDAeFw0yMzA2MTMxMTU3MjVaFw0yODA2MTMxMTU3MjVaMEgxEzARBgNVBAoMCkhvcHBzY290Y2gxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEaMBgGA1UEAwwRT25lTG9naW4gQWNjb3VudCAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCef4H515ey39Lq2/hHYG0mPbs9RKcz5epC3O2Asfc+8OAMGt6c9AUauGBNU0UoJyopirsYNwS//40pmzST19aUNY/hiKMSqcG0MewZ2FXgS6GQLU2/3dZkPN9wUCRy7S945lk3wuljJnJ5gT+jmpk4hCF8FZp1DULUvBiNQjef4oFPWUuvocXbkXl9P/0CZ+egBZYcl9BD7e+GywT/Kvj/M0q3cmnP+fPjC1PqU30YoSSqs3pBeL34UEi8vo8IA7owM4Pgxwz4Z+E4h6y8d1ROwQ5elDVUjC4ONljSPD+x0BYygkErGTve+sNxQlrZeetzzla4VdsWF+cnxeVaw/d5AgMBAAGjgcYwgcMwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUuYIRXw/Ut5d6CrpomRsnT3108RswgYMGA1UdIwR8MHqAFLmCEV8P1LeXegq6aJkbJ099dPEboUykSjBIMRMwEQYDVQQKDApIb3Bwc2NvdGNoMRUwEwYDVQQLDAxPbmVMb2dpbiBJZFAxGjAYBgNVBAMMEU9uZUxvZ2luIEFjY291bnQgghR2m5a487WjFVWuRnfm2f3zfRFn5zAOBgNVHQ8BAf8EBAMCB4AwDQYJKoZIhvcNAQEFBQADggEBAEWd5toIw7uJvcQswsPOsbhjIugDv0r4l+wWIbRdo7CJoogNgbePrMqgYSEKNQL7mAbmJWFT+aQ9zagKx/dAKj1SimX2jqHhBCN5ipJERw1McH6wX2y/yn/0a69KkioUa3LuDW8n1tOI5FQmmNdSIMUiXO7SXWOLnRJN98QRXOXWiN9DQE9WgZ225Dz3/rDhjuuvLw5WFXU5WOUXq9ZR2k96ojtCfNp5FmJkTuXt1oY+dervALqt1jA+hScDQyxuo615xdC6KZQCbn1wGPzYnixH4TC7IdzHEKlVEeBjZFt9rK/SxXZDA36MQFUvV1NSYLKC+fnKGXrqsLfp5S6LWnQ=',
      entryPoint:
        'https://arif-dev.onelogin.com/trust/saml2/http-post/sso/8b3f00a8-493e-4398-9bc3-bc7530207cb7',
      wantAssertionsSigned: true,
      wantAuthnResponseSigned: false,

      // Okta configuration
      // issuer: 'http://www.okta.com/exk9znm8tnJItiDkA5d7',
      // audience: 'nestjs-saml',
      // callbackUrl: 'localhost:3000/v1/auth/sso/saml/callback',
      // cert: 'MIIDqDCCApCgAwIBAgIGAYjC2gJnMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi02MDgxNTAyODEcMBoGCSqGSIb3DQEJ ARYNaW5mb0Bva3RhLmNvbTAeFw0yMzA2MTYwNjE2MjdaFw0zMzA2MTYwNjE3MjdaMIGUMQswCQYD VQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsG A1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi02MDgxNTAyODEc MBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC ggEBAMa1YrNqNuV56EJiUX6Q687mRhCmy/hmh3td5iYA7IqIVDVwnx0AfaMq5Wcj3rJ+n3TPhMrK ls0bu9MW151BIZc6A4b3l9k5DCweDjvsFh45lWMzpKRfl6LmuvU1sT3VeM40K36YtLaEubkOQkj3 +5cLOT+R795xFpmO6Busp7+eYRbJ0c2Bk9QimP6I01caq5LjBTyRr+i3ql8dmvoNqIuwjpgEf9T2 TQIzAJkoDsFwf+bVPwUh9jezsr5n46YAgdWAZfF23xnY2PZJjEaIshzPQk9Wbsi6FMsNGEJ9c0x1 8kUHF7wHMy9O8TV9HlWAnIV8oMe2If12HB7/2le6V50CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA NtWW8o23LvEFujK3n291JpGXoyaXC3F7oHz1rtsy0bslPrnhsD4Q3hWBrl+chP4MltgY8cum3qez QGhU+nnjKrQX5o6Ba1buJXsbiVYvkqrxAFhIJOug0kitbstXrvLk2A+ZVBteA2bbm21anvRSA+3n Gxhu7FSPEkp6ulopOz78Bl8GUl+GEqn8RC0+CQgvivcOtrtwSMG0827iEtBjlg+4SfShMBv1mj0t 3UsnhRhW8omZkKEPuU+y5kPUgyh3cceQHjp/8b4SziZawdEUMK+GZRNnOFuRVC9rJ0QcsxgFWWb3 qXEJ3TK+cXkAI78f6pJ2eTyAcuvnnaqx0IksVg==',
      // entryPoint:
      //   'https://dev-60815028.okta.com/app/dev-60815028_hoppscotch_1/exk9znm8tnJItiDkA5d7/sso/saml',
      // wantAssertionsSigned: true,
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
