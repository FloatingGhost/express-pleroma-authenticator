# express-pleroma-authenticator

Implement pleroma-linked oauth2 on your express thing!

Usage:

```javascript
PleromaAuth(baseUrl, opts);

const auth = new PleromaAuth(
    'https://myfediverse.instance',
    { redirectUris: `http://localhost:${port}/callback` } 
);
```

Options:
- clientName
- redirectUris
- scopes

See `example/` for full usage.
