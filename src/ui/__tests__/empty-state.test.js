import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { EmptyState } from '../empty-state';
test('renders empty state', () => {
    const { getByText } = render(_jsx(EmptyState, { title: 'No data', message: 'Nothing here' }));
    expect(getByText('No data')).toBeInTheDocument();
});
//# sourceMappingURL=empty-state.test.js.map