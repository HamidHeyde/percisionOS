## Location of deployed application
https://percisionos.herokuapp.com/

## Instructions to run assignment locally
- Cloning the project
```
git clone https://github.com/HamidHeyde/percisionOS
cd percisionOS
```
- Node Server (HTTP =>localhost:5600) (HTTPS =>localhost:6600)
```
npm install
npm run startDev
```

## Notes
The certificates for HTTPS server has been generated using following command and is a self-signed certificate being generated for the purpose of testing this application. If you get a warning in chrome when loading the application using https port (6600), you can continue. You see this warning because the certificates are Self-Signed.

You can also replace them with your own valid *[key,cert]* pair in the *certificates* folder.
```
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -subj '/CN=localhost' -keyout key.pem -out cert.pem -days 365
```