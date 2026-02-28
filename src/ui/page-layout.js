import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import SkipLink from '../components/SkipLink';
export default function PageLayout({ children }) {
    return (_jsxs("div", { style: { minHeight: '100vh', background: 'var(--bg)' }, children: [_jsx(SkipLink, {}), _jsx(Navbar, {}), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, padding: 16 }, children: [_jsx(Sidebar, {}), _jsx("main", { id: 'main-content', style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: children })] })] }));
}
//# sourceMappingURL=page-layout.js.map