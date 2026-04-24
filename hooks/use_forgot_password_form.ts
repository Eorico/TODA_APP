import { useForm } from 'react-hook-form';
import { EmailStepData, CodeStepData, PasswordStepData } from '@/constants/data';

export const useEmailStepForm = () =>
  useForm<EmailStepData>({ defaultValues: { email: '' } });

export const useCodeStepForm = () =>
  useForm<CodeStepData>({ defaultValues: { code: '' } });

export const usePasswordStepForm = () =>
  useForm<PasswordStepData>({ defaultValues: { newPassword: '', confirmPassword: '' } });