import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import Card from '../ui/card';
import { Badge } from '../ui/badge';
const STORAGE_KEY = 'wjb_settings_v1';
export default function SettingsPage() {
    const [settings, setSettings] = useState({
        theme: 'dark',
        notifications: { email: true, slack: false, inApp: true },
    });
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw)
                setSettings(JSON.parse(raw));
        }
        catch (e) { }
    }, []);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings]);
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx(Card, { title: 'Settings', subtitle: 'Manage integrations & preferences', children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: "Sync status" }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Last sync: just now" })] }), _jsx("button", { className: 'cursor-pointer', style: { padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent' }, children: "Sync now" })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: "Theme" }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Light / dark mode" })] }), _jsx("label", { style: { fontSize: 12, opacity: 0.7, marginRight: 8 }, htmlFor: "theme-select", children: "Theme" }), _jsxs("select", { id: "theme-select", value: settings.theme, onChange: (e) => setSettings(s => ({ ...s, theme: e.target.value })), style: { padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent' }, children: [_jsx("option", { value: 'dark', children: "Dark" }), _jsx("option", { value: 'light', children: "Light" })] })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: "GitHub" }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "wjbetech-claw" }), _jsx("a", { href: 'https://github.com/settings/apps', target: '_blank', rel: 'noreferrer', style: { fontSize: 12 }, children: "Manage connection" })] }), _jsx(Badge, { variant: 'success', children: "Connected" })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: "Vercel" }), _jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "Deploy status" }), _jsx("a", { href: 'https://vercel.com/account/tokens', target: '_blank', rel: 'noreferrer', style: { fontSize: 12 }, children: "Connect Vercel" })] }), _jsx(Badge, { variant: 'warning', children: "Needs auth" })] })] }) }), _jsx(Card, { title: 'Notifications', subtitle: 'How you receive updates', children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [_jsxs("div", { style: { fontSize: 12, opacity: 0.7 }, children: ["Need help? See ", _jsx("a", { href: 'https://docs.openclaw.ai', target: '_blank', rel: 'noreferrer', children: "docs" }), "."] }), [
                            ['email', 'Email summaries'],
                            ['slack', 'Slack alerts'],
                            ['inApp', 'In‑app pings'],
                        ].map(([key, label]) => (_jsxs("label", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 8 }, children: [_jsx("span", { children: label }), _jsx("input", { type: 'checkbox', "aria-label": label, checked: settings.notifications[key], onChange: (e) => setSettings(s => ({ ...s, notifications: { ...s.notifications, [key]: e.target.checked } })) })] }, key)))] }) })] }));
}
//# sourceMappingURL=SettingsPage.js.map