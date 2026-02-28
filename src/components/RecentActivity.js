import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo } from 'react';
import Card from '../ui/card';
const items = [
    { title: 'Deploy completed', meta: 'payments-api • 2m ago', status: 'success' },
    { title: 'Rollback triggered', meta: 'edge-gateway • 10m ago', status: 'warning' },
    { title: 'PR merged', meta: 'web-dashboard • 25m ago', status: 'info' },
    { title: 'Incident resolved', meta: 'auth-service • 1h ago', status: 'success' },
];
function RecentActivity() {
    return (_jsx(Card, { title: 'Recent activity', subtitle: 'Latest updates across environments', children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: items.map((item) => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: item.title }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: item.meta })] }), _jsx("span", { style: { fontSize: 12, padding: '4px 8px', borderRadius: 999, border: '1px solid var(--border)' }, children: item.status })] }, item.title))) }) }));
}
export default memo(RecentActivity);
//# sourceMappingURL=RecentActivity.js.map