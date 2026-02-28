import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import OverviewStats from '../OverviewStats';
test('renders overview stats', () => {
    const { getByText } = render(_jsx(OverviewStats, {}));
    expect(getByText('Active pipelines')).toBeInTheDocument();
});
//# sourceMappingURL=OverviewStats.test.js.map