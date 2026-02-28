import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo } from 'react';
import Card from '../ui/card';
const envs = [
    { name: 'Production', nodes: 18, uptime: '99.98%', region: 'us-east-1' },
    { name: 'Staging', nodes: 6, uptime: '99.2%', region: 'us-west-2' },
    { name: 'QA', nodes: 4, uptime: '98.6%', region: 'eu-central-1' },
];
function EnvironmentsGrid() {
    return (_jsx(Card, { title: 'Environments', subtitle: 'Health and footprint by cluster', children: _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }, children: envs.map((env) => (_jsxs("div", { style: { border: '1px solid var(--border)', borderRadius: 10, padding: 12 }, children: [_jsx("div", { style: { fontWeight: 600 }, children: env.name }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7, marginTop: 6 }, children: ["Region: ", env.region] }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: ["Nodes: ", env.nodes] }), _jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: ["Uptime: ", env.uptime] })] }, env.name))) }) }));
}
export default memo(EnvironmentsGrid);
//# sourceMappingURL=EnvironmentsGrid.js.map