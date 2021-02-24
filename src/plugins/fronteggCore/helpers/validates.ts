import * as Yup from 'yup';
import { ValidationError } from 'yup';
import owasp, { TestConfig } from 'owasp-password-strength-test';
import i18n from '@/i18n';

export const validatePassword = () => {
  const requiredSchema = Yup.object().shape({
    password: Yup.string().required()
  });
  const minSchema = Yup.object().shape({
    password: Yup.string().min(6),
  });
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.password') });
  const minMsg = i18n.t('validation.min-length', { name: i18n.t('common.password'), limit: 6 });

  return [
    v => requiredSchema.isValidSync({'password': v }) || requiredMsg,
    v => minSchema.isValidSync({'password': v }) || minMsg
  ]
}

export const validateEmail = () => {
  const requiredSchema = Yup.object().shape({
    email: Yup.string().required()
  });
  const emailSchema = Yup.object().shape({
    email: Yup.string().email(),
  });
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.email') });
  const emailMsg = i18n.t('validation.must-be-a-valid-email', 'Must be a valid email');

  return [
    v => requiredSchema.isValidSync({'email': v }) || requiredMsg,
    v => emailSchema.isValidSync({'email': v }) || emailMsg
  ]
}

// TODO: update all below validations as above to use them with vuetify
export const validateTwoFactorCode = (t: any) =>
  Yup.string()
    .length(6, i18n.t('validation.min-length', { name: 'Code', limit: 6 }))
    .required(i18n.t('validation.required-field', { name: 'code' }));

export const validateTwoFactorRecoveryCode = (t: any) =>
  Yup.string()
    .min(8, i18n.t('validation.max-length', { name: 'code', limit: 8 }))
    .required(i18n.t('validation.required-field', { name: 'code' }));

export const validatePasswordConfirmation = (ref) => {
  const confirmPass = (v) => {
    const confirmPassSchema = Yup.object().shape({
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
    })
    if(!ref?.password?.value.length) {
      return true;
    }
    return confirmPassSchema.isValidSync({'confirmPassword': v, 'password': ref?.password?.value});
  }
  return [
    (v: string) => !!v || i18n.t('validation.required-field', { name: i18n.t('common.password') }),
    (v: string) => confirmPass(v) || i18n.t('validation.passwords-must-match')
  ]
}

export const requiredPassword = () => {
  const requiredSchema = Yup.object().shape({
    password: Yup.string().required()
  });
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.password') });
  return [v => requiredSchema.isValidSync({'password': v }) || requiredMsg]
}

export const validatePasswordUsingOWASP = async (testConfig: Partial<TestConfig> | null, val: string) =>
  new Promise((resolve, reject) => {
    // owasp validation
    const validatePass =  async function (value) {
      if (value == null) {
        resolve([]);
      }
      testConfig && owasp.config(testConfig);
      const { errors } = owasp.test(value);
      if (errors?.length) {
        resolve(errors[0]);
      }
      resolve([]);
    }
    validatePass(val).then(error => {
      resolve(error) 
    })
  })

export const validateDomain = (t: any) =>
  Yup.string()
    .matches(
      /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/,
      i18n.t('validation.must-be-a-valid-domain', 'Must be a valid domain')
    )
    .required(i18n.t('validation.required-field', { name: 'domain' }));

export const validateUrl = (name: string, t: any) =>
  Yup.string()
    .url(i18n.t('validation.must-be-a-valid-url', 'Must be a valid URL'))
    .required(i18n.t('validation.required-field', { name }));

export const validateLength = (name: string, limit: number, t: any) =>
  Yup.string()
    .min(limit, i18n.t('validation.min-length', { name, limit }))
    .required(i18n.t('validation.required-field', { name }));

export const validateRequired = (name: string, t: any) =>
  Yup.string().required(i18n.t('validation.required-field', { name }));

export const validateArrayLength = (t: any, name: string) =>
  Yup.array().required(i18n.t('validation.required-field', { name }));

export const validateSchema = (props: any) => Yup.objeci18n.t(props);

export const validationPhone = (t: any) =>
  Yup.string()
    .matches(
      /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/,
      i18n.t('validation.invalid-phone', 'Invalid phone number')
    )
    .required(i18n.t('validation.required-field', { name: 'phone' }));

export const validateSchemaSync = (props: any, values: any) =>
  new Promise((resolve) => {
    validateSchema(props)
      .validate(values, { abortEarly: false })
      .then(() => resolve({}))
      .catch((errors) => {
        resolve(
          errors.inner
            .map((error: ValidationError) => ({ [error.path]: error.message }))
            .reduce((p: object, n: object) => ({ ...p, ...n }), {})
        );
      });
  });
