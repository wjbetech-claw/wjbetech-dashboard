import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ToastsProvider from '../ui/Toasts';
import MainDashboard from './MainDashboard';
export default function DashboardPage() {
    return (_jsx(ToastsProvider, { children: _jsx(MainDashboard, {}) }));
}
//# sourceMappingURL=DashboardPage.js.map