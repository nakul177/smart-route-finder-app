import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = '' }) => {
    return (
        <div className={`p-6  ${className}`}>
            {children}
        </div>
    );
};
