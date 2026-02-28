import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import AlertsPanel from '../AlertsPanel';
test('renders alerts panel', () => {
    const { getByText } = render(_jsx(AlertsPanel, {}));
    expect(getByText('Alerts')).toBeInTheDocument();
});
//# sourceMappingURL=AlertsPanel.test.js.map