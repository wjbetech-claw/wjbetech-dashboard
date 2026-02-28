import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../lib/utils';
export const Input = React.forwardRef(({ className, required, ...props }, ref) => (_jsx("input", { ref: ref, className: cn('flex h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)]', className), required: required, "aria-required": required ? true : undefined, ...props })));
Input.displayName = 'Input';
//# sourceMappingURL=input.js.map