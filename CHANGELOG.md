# Change Log

## [2.0.12](https://github.com/frontegg/frontegg-vue/compare/v2.0.11...v2.0.12) (2022-12-8)

- FR-9969 - fix getBaseUrl never returns context prefix
- FR-9927 - fix validation invite with bulk
- FR-9914 - Move initial api calls to NextJS server-side before the first render
- FR-9887 - OTC digits are not visible on mobile devices
- FR-9860 - mfa devices management
- FR-9418 - invite email bulk
- FR-9852 - copy invite link fix
- FR-9858 - fix - appearance and settings should be optional for invite user customization

- FR-9852 - Support copy invite link for dynamic base URL as well (mainly for Next.js)
- FR-9742 - login with mfa
- FR-9520 - FR-9504 - fonts improvements


## [2.0.11](https://github.com/frontegg/frontegg-vue/compare/v2.0.10...v2.0.11) (2022-11-28)

- Update hide fields API according to new security tabs naming
- Changed max length for secret fields to 100 characters
- Added support for customizing invite user dialog fields

## [2.0.10](https://github.com/frontegg/frontegg-vue/compare/v2.0.9...v2.0.10) (2022-11-23)

- Added support for admin portal pre-defined theme options (dark, vivid, modern, and classic themes)
- Added support for customizing admin portal navigation hover color
- Fixed typo of Andorra country in countries dropdown
- Fixed select popup alignment issue
- Changed no local authentication feature to also hide the sign-up form when there is no local authentication option (use only social logins and SSO for signing up)
- Added mock for feature flags API for admin portal preview mode
- Fixed resend invitation and activate your account API calls
- Fixed creating custom webhook on the Admin Portal is sent with the event ID and not with the event Key
- Added support for customizing fields and tabs in the admin portal
### VueJS Wrapper 2.0.10:
- Updated README.md with the current integration guide

## [2.0.9](https://github.com/frontegg/frontegg-vue/compare/v2.0.8...v2.0.9) (2022-11-11)

### VueJS Wrapper 2.0.9:
- Added authorized content guard support

## [2.0.8](https://github.com/frontegg/frontegg-vue/compare/v2.0.7...v2.0.8) (2022-10-26)

### VueJS Wrapper 2.0.8:
- FR-9186 - Generate changelog based on AdminPortal and LoginBox changes

## [0.2.10](https://github.com/frontegg/frontegg-vue/compare/v0.2.9...v0.2.10) (2021-08-09)


### Bug Fixes

* Update pre-release workflow ([1f91996](https://github.com/frontegg/frontegg-vue/commit/1f91996ad320614f3e61bfc3187724e6de133a26))
* **build:** Refactor Pipeline to support new publish flow ([330e0d3](https://github.com/frontegg/frontegg-vue/commit/330e0d3a5d643eb4f032c838c90faf98e4ee8fbc))
