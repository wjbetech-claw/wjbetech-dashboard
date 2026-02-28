import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from './theme-switcher';
import { Button } from './button';
export default function Navbar() {
    return (_jsxs("header", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'var(--panel)', borderBottom: '1px solid var(--border)' }, children: [_jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: _jsx("div", { style: { fontWeight: 700 }, children: "wjbetech-dashboard" }) }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx(Button, { asChild: true, variant: "ghost", children: _jsx(NavLink, { to: "/board", className: "cursor-pointer", style: { textDecoration: 'none' }, children: "Board" }) }), _jsx(Button, { asChild: true, variant: "ghost", children: _jsx(NavLink, { to: "/jobs", className: "cursor-pointer", style: { textDecoration: 'none' }, children: "Jobs" }) }), _jsx(ThemeSwitcher, {})] })] }));
}
//# sourceMappingURL=navbar.js.map