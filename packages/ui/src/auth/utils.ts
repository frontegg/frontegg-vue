import * as Yup from 'yup';
import owasp, { TestConfig } from 'owasp-password-strength-test';
import i18n from '@/i18n';

export const validatePassword = () => {
  const requiredSchema = Yup.string().required();
  const minSchema = Yup.string().min(6);
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.password') });
  const minMsg = i18n.t('validation.min-length', { name: i18n.t('common.password'), limit: 6 });
  return [
    v => requiredSchema.isValidSync(v) || requiredMsg,
    v => minSchema.isValidSync(v) || minMsg
  ]
}

export const validateEmail = () => {
  const requiredSchema = Yup.string().required();
  const emailSchema = Yup.string().email();
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.email') });
  const emailMsg = i18n.t('validation.must-be-a-valid-email', 'Must be a valid email');
  return [
    v => requiredSchema.isValidSync(v) || requiredMsg,
    v => emailSchema.isValidSync(v) || emailMsg
  ]
}

export const validateTwoFactorCode = () => {
  const requiredSchema = Yup.string().required();
  const lengthSchema = Yup.string().length(6);
  const requiredMsg = i18n.t('validation.required-field', { name: 'code' });
  const lengthMsg = i18n.t('validation.min-length', { name: 'Code', limit: 6 });
  return [
    v => requiredSchema.isValidSync(v) || requiredMsg,
    v => lengthSchema.isValidSync(v) || lengthMsg
  ]
}

export const validateTwoFactorRecoveryCode = () => {
  const requiredSchema = Yup.string().required();
  const minSchema = Yup.string().min(8);
  const requiredMsg = i18n.t('validation.required-field', { name: 'code' });
  const minMsg = i18n.t('validation.max-length', { name: 'code', limit: 8 });
  return [
    v => requiredSchema.isValidSync(v) || requiredMsg,
    v => minSchema.isValidSync(v) || minMsg
  ]
}

export const validatePasswordConfirmation = (ref) => {
  const confirmPass = (v: string) => {
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
    (v: string) => !!v || i18n.t('validation.required-field', { name: 'confirmation of the password' }),
    (v: string) => confirmPass(v) || i18n.t('validation.passwords-must-match')
  ]
}

export const validatePasswordUsingOWASP = async (testConfig: Partial<TestConfig> | null, val: string) =>
  new Promise((resolve, reject) => {
    // owasp validation
    const validatePass =  async function (value) {
      if (!value?.length) {
        resolve(i18n.t('validation.required-field', { name: i18n.t('common.password') }));
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

export const validateDomain = () =>
  Yup.string()
    .matches(
      /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/,
      i18n.t('validation.must-be-a-valid-domain', 'Must be a valid domain')
    )
    .required(i18n.t('validation.required-field', { name: 'domain' }));

export const validateUrl = (name: string) =>
  Yup.string()
    .url(i18n.t('validation.must-be-a-valid-url', 'Must be a valid URL'))
    .required(i18n.t('validation.required-field', { name }));

export const validateLength = (name: string, limit: number) =>
  Yup.string()
    .min(limit, i18n.t('validation.min-length', { name, limit }))
    .required(i18n.t('validation.required-field', { name }));

export const validateRequired = (name: string) => {
  const requiredSchema = Yup.string().required();
  const requiredMsg = i18n.t('validation.required-field', { name });
  return [
    v => {
      const test = requiredSchema.isValidSync(v);
      return requiredSchema.isValidSync(v) || requiredMsg
    },
  ]
}
  

export const validateArrayLength = (name: string) =>
  Yup.array().required(i18n.t('validation.required-field', { name }));

export const validateSchema = (props: any) => Yup.objeci18n.t(props);

export const validationPhone = () =>
  Yup.string()
    .matches(
      /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/,
      i18n.t('validation.invalid-phone', 'Invalid phone number')
    )
    .required(i18n.t('validation.required-field', { name: 'phone' }));
