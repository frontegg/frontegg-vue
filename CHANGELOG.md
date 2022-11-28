# Change Log

## [2.0.11](https://github.com/frontegg/frontegg-vue/compare/v2.0.10...v2.0.11) (2022-11-28)

- FR-9750 - change api according to the new names security tabs
- FR-9717 - update rest api to have optional name in add user payload - and make sure to not send name if not exist
- FR-9826 - fix table header in dark theme
- FR-9237 - Max length for secret fields increased to 100 
- FR-9742 - enroll mfa list
- FR-9772 - Send NULL on profilePictureUrl rather than null
- FR-9717 - Invite user customize form API
- FR-9597 - Webhooks - missing validation error on UI when added not allowed URL
- FR-9792 - fix theme chunk
- FR-9784 - pass merged palette to themes json
- FR-9777 - add option to color hover in navigation
- FR-9235 - Fix AndorrA typo in country dropdown
- FR-9725 - fix select popup
- FR-9771 - refactor toggle button
- FR-9749 - fix big titles on speedy login thumb nail mode
- FR-9730 - select tree for dark theme
- FR-9721 - add possibilities to security tabs for dark theme
- FR-9696 - fix responsiveness on builder preview
- FR-8402 - Hide sign up form when there is not local authentication same as we do in the login flow
- FR-9652 - mock flags
- FR-9667 - fix copy of restrictions
- FR-9677 - add slack provider to social login types
- FR-8849 - Resend invite and activate your account calls fix
- FR-9260 - Creating Custom webhook on the Admin Portal is sent with the evnetId and not with the eventKey

- FR-9665 - Support logout from hosted login in vanilla.js via app instance
- FR-9662 - pagination in dark them

- FR-9664 - update @frontegg/rest-api
- FR-9661 - fix chips in dark them
- FR-9653 - fix hide fields session management
- FR-9659 - inherit button dark them
- FR-9655 - fix dialog and select dark them
- FR-8948 - Fix - clean error message from sign up page when visiting it again
- FR-9624 - typo + snyk git ignore
- FR-9629 - typography should be white in dark theme
- FR-9625 - empty table in dark theme
- FR-9631 - resize the login box when logo is null
- FR-9176 - hide fields security and account details pages
- FR-8714 - Fix ReCaptcha timeout

### VueJS Wrapper 2.0.11:
- FR-9698-README-fixes
- FR-9633 - Fix demo saas tests

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
