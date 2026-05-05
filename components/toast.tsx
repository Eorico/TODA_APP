import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { ToastType } from "@/constants/data";

interface ToastProps {
    visible: boolean;
    message: string;
    type?: ToastType;
    duration?: number;
    onHide: () => void;
}

const config: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
    success: {
        bg: '#1A3D1A',
        icon: <CheckCircle size={18} color="#4ADE80" />,
    },
    error: {
        bg: '#3D1A1A',
        icon: <XCircle size={18} color="#F87171" />,
    },
    warning: {
        bg: '#3D2E0A',
        icon: <AlertCircle size={18} color="#FCD34D" />,
    },
    info: {
        bg: '#1A2A3D',
        icon: <Info size={18} color="#60A5FA" />,
    },
};

export function Toast({ visible, message, type = 'info', duration = 3000, onHide }: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const { bg, icon } = config[type];

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 56,
        left: 16,
        right: 16,
        zIndex: 9999,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <View
        style={{
          backgroundColor: bg,
          borderRadius: 14,
          paddingVertical: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {icon}
        <Text
          style={{
            flex: 1,
            color: '#fff',
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 20,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}