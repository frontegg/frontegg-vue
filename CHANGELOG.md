# Change Log

## [2.0.32](https://github.com/frontegg/frontegg-vue/compare/v2.0.31...v2.0.32) (2023-5-4)

- FR-11632 - update code owners
- FR-11581 - a11y login box onenter event
- FR-11353 - all accounts tree graph component

### VueJS Wrapper 2.0.32:
- FR-11632 - update CODEOWNERS

## [2.0.31](https://github.com/frontegg/frontegg-vue/compare/v2.0.30...v2.0.31) (2023-4-28)

- FR-11564 - Social login button shouldn't inherit from secondary color


## [2.0.30](https://github.com/frontegg/frontegg-vue/compare/v2.0.29...v2.0.30) (2023-4-27)

- Fixed passkeys issue with reCaptcha
- Removed feature flag from passkeys button
- Enable loading Frontegg helper scripts by providing query params to Frontegg external source
- Security upgrade webpack from 5.74.0 to 5.76.0


## [2.0.29](https://github.com/frontegg/frontegg-vue/compare/v2.0.28...v2.0.29) (2023-4-27)

- Fixed input hover issue on suffix icon
- A11y improvements 


## [2.0.28](https://github.com/frontegg/frontegg-vue/compare/v2.0.27...v2.0.28) (2023-4-25)

- Fix Passkeys button style 
- Support login per tenant with search param


## [2.0.27](https://github.com/frontegg/frontegg-vue/compare/v2.0.26...v2.0.27) (2023-4-23)
- Lock reduxjs/toolkit version to be compatible in Vite types plugin
- Fixed password input placeholder text in the login box
- Fixed social login buttons order
- Fix Vite js-sha256 warning
- Fixed company name error in split mode sign up
- Fixed phone number dropdown theming
- Added aria labels to buttons

## [2.0.26](https://github.com/frontegg/frontegg-vue/compare/v2.0.25...v2.0.26) (2023-4-17)
- Added support to preserve query params between all auth routes
- Added support for generating a code challenge in non-secure domains [HostedLogin Mode]
- Fixed issue with updating SSO group name in the admin portal
- Added live SSO integration guide
- Added support to seperate first and last name in sign up form

### VueJS Wrapper 2.0.26:
- Added support to preserve query params between all auth routes

### VueJS Wrapper 2.0.26:
- FR-11351 - preserve-query-params-for-login-per-tenant

## [2.0.25](https://github.com/frontegg/frontegg-vue/compare/v2.0.24...v2.0.25) (2023-4-3)

- Added support for SCIM groups
- Updated texts across login box - grammar and terminology
- Added impersonation indicator to show impersonator that they're in an impersonation session
- Added passkeys feature

## [2.0.24](https://github.com/frontegg/frontegg-vue/compare/v2.0.23...v2.0.24) (2023-3-27)

- FR-11247 - fix version branch 6.82

- FR-11065 - add passkeys mock ff
- FR-11189 - mfa authenticator app change input type
- FR-10821 - fix table color
- FR-11204 - add unit testing with jest
- FR-11139 - fix groups
- FR-11039 - fix groups dummy
- FR-11039 - ff groups
- FR-10530 - fix ff store name
- FR-11067 - error handling on profile image upload
- FR-11039 - extend users table with groups column

- FR-10530 - fix ff
- FR-10654 - Fix OIDC loading screen
- FR-10530 - fix ff store name
- FR-10530 - fix ff store name
- FR-10530 - change ff behavior  
- FR-10976 - Remove idle session export from default items


## [2.0.23](https://github.com/frontegg/frontegg-vue/compare/v2.0.22...v2.0.23) (2023-3-16)

- Fixed use permission regex issue to accept a wild card
- User groups design fixes
- Fixed passkeys loading mode and login flow with MFA
- Update dependencies between passkeys and MFA on the privacy page
- Added support to reset Idle session timeout by post messages from the client iFrame
- Added an option to enforce redirect URLs to the same site only to avoid security issues
- Added support for customized social login providers


## [2.0.22](https://github.com/frontegg/frontegg-vue/compare/v2.0.21...v2.0.22) (2023-3-10)

- Fixed resend OTC with reCaptcha
- Added  support to let tenants create a manage user groups in the admin portal under a FF
- Added support to login with passkeys and manage passkeys in the admin portal under a FF
- Fixed invite users issue when the vendor is not forcing roles and permissions
- Support auth strategy and social logins for login per tenants
- Refactored feature flag mechanism to be based on rest-api package
- Fixed validation for postcode in admin portal forms
- Fixed SMS code input to have input type number
- Improved auth screens form UX 

## [2.0.21](https://github.com/frontegg/frontegg-vue/compare/v2.0.20...v2.0.21) (2023-2-21)

- Fixed Admin portal SSO provider's options to be correlated with the vendor choice
- Fixed background for table pivot column
- Fixed impersonation by removing unnecessary redirects and adding a refresh call
- Fixed style reorder bug when using @emotion/react and Frontegg Next.JS

## [2.0.20](https://github.com/frontegg/frontegg-vue/compare/v2.0.19...v2.0.20) (2023-2-8)

- Updated M2M tokens to reflect the vendor choice


## [2.0.19](https://github.com/frontegg/frontegg-vue/compare/v2.0.18...v2.0.19) (2023-2-7)

- Fixed go-to-sign-up message position in speedy login layout
- Added an input component to the library for adding members to a tenant
- Fix filtering SSO providers according to the vendor selection
- Added user groups card header component to the library
- Improved the admin portal and login box performance and bundle size


## [2.0.18](https://github.com/frontegg/frontegg-vue/compare/v2.0.17...v2.0.18) (2023-1-29)

- Fixed error message position in login with SMS screen
- Fixed missing client ID after creating API token

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
