import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MainDashboard from '../MainDashboard';
test('dashboard has no a11y violations', async () => {
    expect.extend(toHaveNoViolations);
    const { container } = render(_jsx(MainDashboard, {}));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
//# sourceMappingURL=a11y.smoke.test.js.map