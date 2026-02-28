import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Card from '../ui/card';
import Kanban from '../components/kanban/Kanban';
export default function BoardPage() {
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: _jsx(Card, { title: 'Board', subtitle: 'Visualize priorities and move work across stages', children: _jsx(Kanban, {}) }) }));
}
//# sourceMappingURL=BoardPage.js.map