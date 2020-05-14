const urljoin = require('url-join');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

class PleromaAuthenticator {
    constructor(baseUrl, opts = {}) {
        this.baseUrl = baseUrl;
        this.clientName = opts.clientName || 'pleroma-express-auth';
        this.redirectUris = opts.redirectUris || 'urn:ietf:wg:oauth:2.0:oob';
        this.scopes = opts.scopes || 'read';
    }

    async _createApplication() {
        const params = new URLSearchParams();
        params.set('client_name', this.clientName);
        params.set('redirect_uris', this.redirectUris);
        params.set('scopes', this.scopes); 
        const resp = await fetch(urljoin(this.baseUrl, '/api/v1/apps'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });
        const application = await resp.json();
        return application;
    }



    async login(req, res) {
        const application = await this._createApplication();
        const params = new URLSearchParams();
        params.set('client_id', application.client_id);
        params.set('scope', this.scopes);
        params.set('redirect_uri', this.redirectUris);
        params.set('response_type', 'code');
        return res
            .redirect(urljoin(this.baseUrl, '/oauth/authorize', `?${params.toString()}`));
    }

    async checkCredentials(token) {
        const resp = await fetch(urljoin(this.baseUrl, '/api/v1/accounts/verify_credentials', {
            headers: { 'Authorization': token }
        }));
        return await resp.json();
    }
}

module.exports = PleromaAuthenticator;
