import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ReposPage from '../ReposPage';
import JobsPage from '../JobsPage';
import SettingsPage from '../SettingsPage';
expect.extend(toHaveNoViolations);
test('repos page a11y', async () => {
    const { container } = render(_jsx(ReposPage, {}));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
test('jobs page a11y', async () => {
    const { container } = render(_jsx(JobsPage, {}));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
test('settings page a11y', async () => {
    const { container } = render(_jsx(SettingsPage, {}));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
//# sourceMappingURL=a11y.pages.test.js.map