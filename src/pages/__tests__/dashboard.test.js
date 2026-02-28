import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import MainDashboard from '../MainDashboard';
test('renders dashboard hero', () => {
    const { getByText } = render(_jsx(MainDashboard, {}));
    expect(getByText('Welcome back, Valruna 👋')).toBeInTheDocument();
});
//# sourceMappingURL=dashboard.test.js.map