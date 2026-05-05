import { ToastType } from "@/constants/data";
import React, { useCallback } from "react";

interface ToastState {
    visible: boolean;
    message: string;
    type: ToastType;
}

export function useToast() {
    const [toast, setToast] = React.useState<ToastState>({
        visible: false,
        message: '',
        type: 'info',
    });

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        setToast({ visible: true, message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, visible: false }));
    }, []);

    return { toast, showToast, hideToast };
}