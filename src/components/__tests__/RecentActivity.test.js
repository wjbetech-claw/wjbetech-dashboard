import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import RecentActivity from '../RecentActivity';
test('renders recent activity', () => {
    const { getByText } = render(_jsx(RecentActivity, {}));
    expect(getByText('Recent activity')).toBeInTheDocument();
});
//# sourceMappingURL=RecentActivity.test.js.map