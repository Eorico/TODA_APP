import { useForm } from 'react-hook-form';
import { LoginFormData } from '@/constants/data';

export const useLoginForm = () => {
    return useForm<LoginFormData>
    ({
        defaultValues: 
        {
            role: 'passenger',
            bodyNumber: '',
            email: '',
            password: ''
        }
    })
}