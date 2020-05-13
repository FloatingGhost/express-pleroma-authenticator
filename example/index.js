const express = require('express');
const PleromaAuth = require('express-pleroma-authenticator');

const app = express();
const port = process.env.PORT || 3000;

const auth = new PleromaAuth(
    'https://ihatebeinga.live',
    { redirectUris: `http://localhost:${port}/callback` }
);
app.get('/login', async (req, res) => {
    await auth.login(req, res);
});

app.get('/callback', async (req, res) => {
    return res.json({got: req.query.code});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
