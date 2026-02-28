import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import JobsPage from '../JobsPage';
test('renders jobs page', () => {
    const { getByText } = render(_jsx(JobsPage, {}));
    expect(getByText('Jobs pipeline')).toBeInTheDocument();
});
//# sourceMappingURL=jobs.test.js.map