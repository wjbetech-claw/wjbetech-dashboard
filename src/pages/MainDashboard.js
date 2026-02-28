import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, Suspense, lazy } from 'react';
const OverviewStats = lazy(() => import('../components/OverviewStats'));
const RecentActivity = lazy(() => import('../components/RecentActivity'));
const PipelineOverview = lazy(() => import('../components/PipelineOverview'));
const EnvironmentsGrid = lazy(() => import('../components/EnvironmentsGrid'));
const AlertsPanel = lazy(() => import('../components/AlertsPanel'));
import Card from '../ui/card';
import { ErrorBanner } from '../ui/error-banner';
import { Skeleton } from '../ui/skeleton';
import { EmptyState } from '../ui/empty-state';
import '../styles/dashboard.css';
import { getOverview, getActiveJob } from '../services/api';
export default function MainDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [overview, setOverview] = useState(null);
    const [activeJob, setActiveJob] = useState(null);
    function load() {
        let mounted = true;
        setLoading(true);
        setError(null);
        getOverview()
            .then((data) => { if (mounted)
            setOverview(data); })
            .catch((err) => { if (mounted)
            setError(err.message || 'Failed to load'); })
            .finally(() => { if (mounted)
            setLoading(false); });
        getActiveJob()
            .then((data) => { if (mounted)
            setActiveJob(data); })
            .catch(() => { });
        return () => { mounted = false; };
    }
    useEffect(() => load(), []);
    return (_jsxs("div", { className: 'dashboard-root', children: [_jsxs("section", { className: 'dashboard-hero dashboard-fade-in', children: [_jsx("div", { className: 'dashboard-hero-title', children: "Welcome back, Valruna \uD83D\uDC4B" }), _jsx("div", { className: 'dashboard-hero-subtitle', children: "Here\u2019s a fast, friendly snapshot of systems, pipelines, and job progress." }), _jsxs("div", { className: 'dashboard-quick-actions', children: [_jsx("button", { className: 'cursor-pointer dashboard-quick-action', children: "\u26A1 Run pipeline" }), _jsx("button", { className: 'cursor-pointer dashboard-quick-action', children: "\uD83E\uDDED View board" }), _jsx("button", { className: 'cursor-pointer dashboard-quick-action', children: "\uD83D\uDCCC Pin repo" }), _jsx("button", { className: 'cursor-pointer dashboard-quick-action', children: "\uD83D\uDD0D Search jobs" })] })] }), loading && _jsxs(Card, { title: 'Loading', subtitle: 'Fetching overview data\u2026', children: [_jsx(Skeleton, { height: 14 }), _jsx("div", { style: { height: 8 } }), _jsx(Skeleton, { height: 14 })] }), error && _jsx(ErrorBanner, { message: error, onRetry: load }), _jsxs("div", { className: 'dashboard-grid dashboard-grid-3 dashboard-fade-in', children: [_jsxs(Card, { title: 'Active job', subtitle: 'Auto-detected focus', children: [_jsx("div", { style: { fontWeight: 700, fontSize: 16 }, children: activeJob?.title || 'No active job' }), _jsx("div", { style: { fontSize: 12, opacity: 0.7, marginTop: 4 }, children: activeJob?.signal || 'Awaiting signals' })] }), _jsx(Card, { title: 'System health', subtitle: 'Live snapshot', children: _jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("div", { style: { fontSize: 28 }, "aria-hidden": "true", children: "\uD83D\uDFE2" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 700, fontSize: 18 }, children: overview?.systemHealth?.message || 'All systems operational' }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Next check in 4 minutes" })] })] }) }), _jsx(Card, { title: 'Deployments', subtitle: 'Last 24 hours', children: _jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("div", { style: { fontSize: 28 }, "aria-hidden": "true", children: "\uD83D\uDE80" }), _jsxs("div", { children: [_jsxs("div", { style: { fontWeight: 700, fontSize: 18 }, children: [overview?.deployments?.completed24h ?? 18, " completed"] }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: [overview?.deployments?.inProgress ?? 2, " in progress"] })] })] }) }), _jsx(Card, { title: 'Focus', subtitle: 'Active objective', children: _jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center' }, children: [_jsx("div", { style: { fontSize: 28 }, "aria-hidden": "true", children: "\uD83C\uDFAF" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 700, fontSize: 18 }, children: overview?.activeFocus?.title || 'Polish dashboard UI' }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: ["ETA: ", overview?.activeFocus?.eta || 'Today'] })] })] }) })] }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading\u2026" }), children: _jsx("div", { className: 'dashboard-fade-in', children: _jsx(OverviewStats, {}) }) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading\u2026" }), children: _jsxs("div", { className: 'dashboard-grid dashboard-grid-2 dashboard-fade-in', children: [_jsx(PipelineOverview, {}), _jsx(RecentActivity, {})] }) }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading\u2026" }), children: _jsxs("div", { className: 'dashboard-grid dashboard-grid-2 dashboard-fade-in', children: [_jsx(EnvironmentsGrid, {}), _jsx(AlertsPanel, {})] }) }), _jsxs("div", { className: 'dashboard-grid dashboard-grid-2 dashboard-fade-in', children: [_jsx(Card, { title: 'Highlights', subtitle: 'Friendly insights', children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: (['✅ CI success rate up 0.6% this week', '✨ New UI polish PR ready for review', '🧩 3 repos need dependency upgrades'].length === 0) ? (_jsx(EmptyState, { title: 'No highlights', message: 'No updates yet.' })) : [
                                '✅ CI success rate up 0.6% this week',
                                '✨ New UI polish PR ready for review',
                                '🧩 3 repos need dependency upgrades',
                            ].map((item) => (_jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsx("span", { style: { fontSize: 18 }, "aria-hidden": "true", children: "\u2022" }), _jsx("span", { children: item })] }, item))) }) }), _jsx(Card, { title: 'Team pulse', subtitle: 'People and momentum', children: _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 12 }, children: ['Ari', 'Devon', 'Kai', 'Mina'].map((name) => (_jsxs("div", { style: { border: '1px solid var(--border)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }, children: [_jsx("img", { src: 'https://placehold.co/48x48', alt: `${name} avatar`, loading: 'lazy', style: { width: 32, height: 32, borderRadius: 999 } }), _jsx("div", { style: { fontWeight: 600 }, children: name }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Active now" })] }, name))) }) })] })] }));
}
//# sourceMappingURL=MainDashboard.js.map