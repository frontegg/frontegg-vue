const express = require('express');
const app = express();
const cors = require('cors');
const { frontegg, withAuthentication, FronteggPermissions } = require('@frontegg/client');

const clientId = process.env.FRONTEGG_CLIENT_ID || '5989f34a-f047-4cd9-b51d-b9d925e30572';
const apiKey = process.env.FRONTEGG_API_KEY || '17d6fff8-452e-4485-9a3d-5c88d7589622';

app.use(cors({ origin: 'http://localhost:8081', credentials: true }))
app.use('/frontegg', frontegg({
    clientId,
    apiKey,
    authMiddleware: withAuthentication(),
    contextResolver: req => {
        return {
            tenantId: req.user ? req.user.tenantId : '',
            userId: req.user ? req.user.id : '',
            permissions: [FronteggPermissions.All],
        }
    }
}));

app.listen(8080);
