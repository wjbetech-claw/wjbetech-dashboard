import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo } from 'react';
import Card from '../ui/card';
const stats = [
    { label: 'Active pipelines', value: '12', delta: '+2' },
    { label: 'Avg. deploy time', value: '4m 18s', delta: '-12%' },
    { label: 'Incidents (7d)', value: '3', delta: '-1' },
    { label: 'Success rate', value: '98.4%', delta: '+0.6%' },
];
function OverviewStats() {
    return (_jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }, children: stats.map((item) => (_jsxs(Card, { children: [_jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: item.label }), _jsx("div", { style: { fontSize: 22, fontWeight: 700, marginTop: 6 }, children: item.value }), _jsxs("div", { style: { fontSize: 12, marginTop: 4, opacity: 0.8 }, children: ["Delta ", item.delta] })] }, item.label))) }));
}
export default memo(OverviewStats);
//# sourceMappingURL=OverviewStats.js.map