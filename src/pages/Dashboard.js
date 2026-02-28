import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Button from '../ui/button';
export default function Dashboard() {
    const dummyJobs = [
        { id: 1, title: 'Frontend Developer (Remote)', company: 'Acme', location: 'Remote' },
        { id: 2, title: 'Prompt Engineer', company: 'DeepLabs', location: 'London' },
    ];
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs("header", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx("h1", { style: { margin: 0 }, children: "wjbetech-dashboard" }), _jsx("div", { children: _jsx(Button, { children: "New Job" }) })] }), _jsxs("main", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 20 }, children: [_jsxs("section", { className: "card", children: [_jsx("h2", { children: "Active Job" }), _jsxs("div", { style: { marginTop: 12 }, children: [_jsx("strong", { children: "Working on: Fix CI flaky tests" }), _jsx("p", { style: { color: 'var(--muted)' }, children: "Signal: last commit on feature/ci-fix" }), _jsx(Button, { variant: "ghost", children: "Open PR" })] })] }), _jsxs("aside", { className: "card", children: [_jsx("h3", { children: "Job Listings" }), _jsx("ul", { children: dummyJobs.map(j => (_jsxs("li", { style: { marginTop: 8 }, children: [_jsxs("a", { href: "#", children: [j.title, " \u2014 ", j.company] }), _jsx("div", { style: { color: 'var(--muted)', fontSize: '0.9rem' }, children: j.location })] }, j.id))) })] })] })] }));
}
//# sourceMappingURL=Dashboard.js.map