import { useForm } from 'react-hook-form';
import { RegisterFormData } from '@/constants/data';

export const useRegistrationForm = () => {
    return useForm<RegisterFormData>
    ({
        defaultValues: 
        {
            role: 'passenger',
            fullName: '',
            contact: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            bodyNumber: '',
            agreed: false,
            licenseUploaded: '',  
            orcrUploaded: '',
        }
    })
}