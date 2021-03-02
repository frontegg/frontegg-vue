import * as Yup from 'yup';
import i18n from '@/i18n';

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
