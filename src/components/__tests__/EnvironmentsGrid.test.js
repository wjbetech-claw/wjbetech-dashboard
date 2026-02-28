import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import EnvironmentsGrid from '../EnvironmentsGrid';
test('renders environments grid', () => {
    const { getByText } = render(_jsx(EnvironmentsGrid, {}));
    expect(getByText('Environments')).toBeInTheDocument();
});
//# sourceMappingURL=EnvironmentsGrid.test.js.map