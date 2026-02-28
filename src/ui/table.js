import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../lib/utils';
export const Table = ({ className, ...props }) => (_jsx("table", { className: cn('w-full text-sm', className), ...props }));
export const THead = ({ className, ...props }) => (_jsx("thead", { className: cn('border-b border-[var(--border)] text-left', className), ...props }));
export const TBody = ({ className, ...props }) => (_jsx("tbody", { className: cn('[&_tr]:border-b [&_tr:last-child]:border-0', className), ...props }));
export const TR = ({ className, ...props }) => (_jsx("tr", { className: cn('hover:bg-[var(--panel)]/60', className), ...props }));
export const TH = ({ className, ...props }) => (_jsx("th", { className: cn('px-3 py-2 font-medium text-[var(--text)]', className), ...props }));
export const TD = ({ className, ...props }) => (_jsx("td", { className: cn('px-3 py-2 text-[var(--text)]', className), ...props }));
//# sourceMappingURL=table.js.map