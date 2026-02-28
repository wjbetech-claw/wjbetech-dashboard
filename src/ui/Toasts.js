import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback } from 'react';
const ToastsContext = createContext(null);
export function ToastsProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const push = useCallback((message) => {
        const id = Math.random().toString(36).slice(2, 9);
        setToasts(t => [...t, { id, message }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
    }, []);
    const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
    return (_jsxs(ToastsContext.Provider, { value: { toasts, push, remove }, children: [children, _jsx("div", { "aria-live": "polite", className: "fixed right-4 bottom-4 space-y-2 z-50", children: toasts.map(t => (_jsx("div", { className: "bg-level-2 border-subtle rounded-md p-3 shadow-md", children: _jsx("div", { className: "text-sm text-primary", children: t.message }) }, t.id))) })] }));
}
export function useToasts() {
    const ctx = useContext(ToastsContext);
    if (!ctx)
        throw new Error('useToasts must be used within ToastsProvider');
    return ctx;
}
export default ToastsProvider;
//# sourceMappingURL=Toasts.js.map