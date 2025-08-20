import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ value, onValueChange, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} className="relative">
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, {
                        isOpen,
                        setIsOpen,
                        value,
                        onValueChange,
                    })
                    : child
            )}
        </div>
    );
};

export const SelectTrigger = ({ children, className = '', isOpen, setIsOpen }) => {
    return (
        <button
            type="button"
            className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            onClick={() => setIsOpen?.(!isOpen)}
        >
            {children}
            <ChevronDown
                className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
        </button>
    );
};

export const SelectValue = ({ placeholder = 'Select...', className = '', value }) => {
    return (
        <span
            className={`block truncate ${!value ? 'text-muted-foreground' : ''} ${className}`}
        >
      {value || placeholder}
    </span>
    );
};

export const SelectContent = ({ children, className = '', isOpen }) => {
    if (!isOpen) return null;

    return (
        <div
            className={`absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95 ${className}`}
        >
            <div className="p-1 max-h-60 overflow-auto">{children}</div>
        </div>
    );
};

export const SelectItem = ({ value, children, className = '', onValueChange, setIsOpen }) => {
    const handleClick = () => {
        onValueChange?.(value);
        setIsOpen?.(false);
    };

    return (
        <div
            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};
