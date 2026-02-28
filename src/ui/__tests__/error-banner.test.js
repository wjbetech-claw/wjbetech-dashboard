import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { ErrorBanner } from '../error-banner';
test('renders error banner', () => {
    const { getByText } = render(_jsx(ErrorBanner, { message: 'Boom' }));
    expect(getByText('Boom')).toBeInTheDocument();
});
//# sourceMappingURL=error-banner.test.js.map