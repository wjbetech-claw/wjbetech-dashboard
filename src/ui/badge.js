import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', {
    variants: {
        variant: {
            default: 'border-transparent bg-[var(--primary-500)] text-white',
            success: 'border-transparent bg-[var(--color-success)] text-white',
            warning: 'border-transparent bg-[var(--color-warning)] text-white',
            danger: 'border-transparent bg-[var(--color-error)] text-white',
            outline: 'text-[var(--text)] border-[var(--border)]',
        },
    },
    defaultVariants: { variant: 'default' },
});
export function Badge({ className, variant, ...props }) {
    return _jsx("div", { className: cn(badgeVariants({ variant, className })), ...props });
}
//# sourceMappingURL=badge.js.map