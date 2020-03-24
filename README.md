[![NPM version](https://img.shields.io/npm/v/@mdnx/tcf-encoder.svg?style=flat-square)](https://www.npmjs.com/package/@mdnx/tcf-encoder)
[![npm module downloads per month](http://img.shields.io/npm/dm/@mdnx/tcf-encoder.svg?style=flat)](https://www.npmjs.org/package/@mdnx/tcf-encoder)

# Consent Management Platform TCFv2 Encoder

This package provides a TCFv2 Consent String Encoder in Typescript.

For more details see [Transparency and Consent Framework](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework).

## Installation / Use in TypeScript projects

```bash
npm install @mdnx/tcf-encoder --save
```

## Development

```bash
npm run test:watch
```

## Related Links

- [Online Consent String Decoder TCString (TCF 1 only)](https://www.decodeconsentstring.com/v1.0/)
- [Quantcast GDPR Consent Cookie workshop (TCF 1 only)](http://gdpr-demo.labs.quantcast.com/user-examples/cookie-workshop.html)

## Disclaimer

This project is **not ready for production** use and still experimental.

This is a very early soft fork of
[Consent-String-SDK-JS](https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS) and
[iabtcf-es](https://github.com/InteractiveAdvertisingBureau/iabtcf-es)
with a different goal: simplicity and without internal magic of loading and processing the gvl.
