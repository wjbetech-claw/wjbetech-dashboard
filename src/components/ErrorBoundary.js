import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return _jsx("div", { style: { padding: 16, border: '1px solid var(--color-error)', borderRadius: 10, background: 'rgba(239,68,68,0.08)' }, children: "Something went wrong." });
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map