import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import ReposPage from '../ReposPage';
test('renders repos page', () => {
    const { getByText } = render(_jsx(ReposPage, {}));
    expect(getByText('Repositories')).toBeInTheDocument();
});
//# sourceMappingURL=repos.test.js.map