import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavLink } from 'react-router-dom';
const navItems = [
    { label: 'Overview', to: '/' },
    { label: 'Board', to: '/board' },
    { label: 'Jobs', to: '/jobs' },
    { label: 'Repos', to: '/repos' },
    { label: 'Settings', to: '/settings' },
];
export default function Sidebar() {
    return (_jsxs("aside", { style: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, height: '100%' }, "aria-label": "Primary navigation", children: [_jsx("div", { style: { fontWeight: 700, marginBottom: 12 }, children: "Workspace" }), _jsx("nav", { "aria-label": "Main", children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: navItems.map((item) => (_jsx(NavLink, { to: item.to, className: 'cursor-pointer', style: ({ isActive }) => ({
                            textDecoration: 'none',
                            color: 'inherit',
                            padding: '6px 8px',
                            borderRadius: 8,
                            background: isActive ? 'var(--panel)' : 'transparent',
                            border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                        }), children: item.label }, item.to))) }) }), _jsxs("div", { style: { marginTop: 20 }, children: [_jsx("div", { style: { fontWeight: 600, marginBottom: 8 }, children: "Quick actions" }), _jsx("button", { className: 'cursor-pointer', style: { width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent' }, children: "New deployment" }), _jsx("button", { className: 'cursor-pointer', style: { width: '100%', marginTop: 8, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent' }, children: "Sync repos" })] })] }));
}
//# sourceMappingURL=sidebar.js.map