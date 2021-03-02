import * as Yup from 'yup';
import i18n from '@/i18n';


export const validatePassword = () => {
  const requiredSchema = Yup.object().shape({
    password: Yup.string().required(),
  });
  const minSchema = Yup.object().shape({
    password: Yup.string().min(6),
  });
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.password') });
  const minMsg = i18n.t('validation.min-length', { name: i18n.t('common.password'), limit: 6 });

  return [
    (password: string) => requiredSchema.isValidSync({ password }) || requiredMsg,
    (password: string) => minSchema.isValidSync({ password }) || minMsg,
  ];
};

export const validateEmail = () => {
  const requiredSchema = Yup.object().shape({
    email: Yup.string().required(),
  });
  const emailSchema = Yup.object().shape({
    email: Yup.string().email(),
  });
  const requiredMsg = i18n.t('validation.required-field', { name: i18n.t('common.email') });
  const emailMsg = i18n.t('validation.must-be-a-valid-email', 'Must be a valid email');

  return [
    (email: string) => requiredSchema.isValidSync({ email }) || requiredMsg,
    (email: string) => emailSchema.isValidSync({ email }) || emailMsg,
  ];
};
