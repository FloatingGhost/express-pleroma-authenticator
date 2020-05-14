# express-pleroma-authenticator

Implement pleroma-linked oauth2 on your express thing!

Usage:

```javascript
PleromaAuth(baseUrl, opts);

const auth = new PleromaAuth(
    'https://myfediverse.instance',
    { redirectUris: `http://localhost:${port}/callback` } 
);

await auth.login(req, res);
const { access_token } = await auth.oauthCallback(code);
const whoAmI = await auth.checkCredentials(access_token);
```

Options:
- clientName
- redirectUris
- scopes

Essentially `.login(req, res)` will redirect your user to the
oauth page, then once they log in they'll be thrown back to your
redirect URI with something in the `code` GET param. You need to handle that 
request and fire off `oauthCallback` to get your actual access token.
Then from there you can do whatever.

See `example/` for full usage.
