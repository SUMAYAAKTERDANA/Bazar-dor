'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#111',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                },
                success: {
                    iconTheme: {
                        primary: '#05893E',
                        secondary: '#fff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#DC2626',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
}