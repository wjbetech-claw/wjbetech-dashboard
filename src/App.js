import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './ui/page-layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import OfflineBanner from './components/OfflineBanner';
import { useOnlineStatus } from './hooks/useOnlineStatus';
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const ReposPage = lazy(() => import('./pages/ReposPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
export default function App() {
    const online = useOnlineStatus();
    return (_jsx(PageLayout, { children: _jsxs(ErrorBoundary, { children: [!online && _jsx(OfflineBanner, {}), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading\u2026" }), children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: '/board', element: _jsx(BoardPage, {}) }), _jsx(Route, { path: '/jobs', element: _jsx(JobsPage, {}) }), _jsx(Route, { path: '/repos', element: _jsx(ReposPage, {}) }), _jsx(Route, { path: '/settings', element: _jsx(SettingsPage, {}) })] }) })] }) }));
}
//# sourceMappingURL=App.js.map