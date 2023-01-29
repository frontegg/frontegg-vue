# Change Log

## [2.0.17](https://github.com/frontegg/frontegg-vue/compare/v2.0.16...v2.0.17) (2023-1-25)

- Added email type to all email inputs in the login box and admin portal
- Fixed mobile width of the login box in modern and classic theme
- Fixed the scrolling issue in the privacy page in the admin portal
- Updated SCIM UI
- Added API to customize forget password button in the login with password page
- Improve split mode values layout
- Added support to access API tokens
- Updated Accept Invitation text, icon, and debounce
- Fixed OTC login for mobile
- Added support to sync vendor security policies
- Added impersonation indication for audit logs
- Added support for Impersonation


## [2.0.16](https://github.com/frontegg/frontegg-vue/compare/v2.0.15...v2.0.16) (2023-1-16)

- Fixed sign up position in dark theme
- Added margin to login error

## [2.0.15](https://github.com/frontegg/frontegg-vue/compare/v2.0.14...v2.0.15) (2023-1-12)

- Fixed login with apple redirect URL
- Added impersonation indication in login session table
- Added support for session expired logout on Hosted Login
- Added support for login with Linkedin
- Added support for Google one tap
- Improve insert OTC screen UI
- Improve UX of authentication forms
- Fix apple logo color and match to font color

## [2.0.14](https://github.com/frontegg/frontegg-vue/compare/v2.0.13...v2.0.14) (2022-12-22)

- Few bug fixes


## [2.0.13](https://github.com/frontegg/frontegg-vue/compare/v2.0.12...v2.0.13) (2022-12-20)

- Added support for Composition API
- Enabled scim without roles
- Fixed menu component for dark theme
- Added api navigation icon
- Added tests for mfa
- Added apple social login types
- Added support for Hiding Invoices
- Expose contextHolder


## [2.0.12](https://github.com/frontegg/frontegg-vue/compare/v2.0.11...v2.0.12) (2022-12-8)

- Fixed ignoring `urlPrefix` issue
- Added the ability to Invite a user by bulk API in the admin portal
- Fixed OTC digits are not visible on mobile devices
- Added MFA devices management section in the admin portal under FF
- Fixed the ability to copy invite link for dynamic base URL as well
- Added new abilities to MFA flows under FF
- Added support for providing an external CDN to load fonts in Frontegg components


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
