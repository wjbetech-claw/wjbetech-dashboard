import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo } from 'react';
import Card from '../ui/card';
const pipelines = [
    { name: 'web-dashboard', env: 'prod', status: 'running', progress: 68 },
    { name: 'payments-api', env: 'staging', status: 'queued', progress: 12 },
    { name: 'edge-gateway', env: 'prod', status: 'success', progress: 100 },
];
function PipelineOverview() {
    return (_jsx(Card, { title: 'Pipeline overview', subtitle: 'Status across primary services', children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: pipelines.map((pipeline) => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: pipeline.name }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: [pipeline.env, " \u2022 ", pipeline.status] }), _jsx("div", { style: { height: 6, borderRadius: 999, background: 'var(--border)', marginTop: 8 }, children: _jsx("div", { style: { height: '100%', borderRadius: 999, background: 'var(--primary-500,#6366f1)', width: `${pipeline.progress}%` } }) })] }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: [pipeline.progress, "%"] })] }, pipeline.name))) }) }));
}
export default memo(PipelineOverview);
//# sourceMappingURL=PipelineOverview.js.map