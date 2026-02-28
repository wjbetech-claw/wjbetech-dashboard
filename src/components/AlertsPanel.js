import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo } from 'react';
import Card from '../ui/card';
const alerts = [
    { title: 'Elevated latency', meta: 'edge-gateway • p95 > 400ms', severity: 'high' },
    { title: 'Queue backlog', meta: 'billing-worker • 152 jobs', severity: 'medium' },
    { title: 'SSL expiry', meta: 'cdn-edge • 12 days left', severity: 'low' },
];
function AlertsPanel() {
    return (_jsx(Card, { title: 'Alerts', subtitle: 'Active notices to review', children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: alerts.map((alert) => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: alert.title }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: alert.meta })] }), _jsx("span", { style: { fontSize: 12, padding: '4px 8px', borderRadius: 999, border: '1px solid var(--border)' }, children: alert.severity })] }, alert.title))) }) }));
}
export default memo(AlertsPanel);
//# sourceMappingURL=AlertsPanel.js.map