import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import SettingsPage from '../SettingsPage';
test('renders settings page', () => {
    const { getByText } = render(_jsx(SettingsPage, {}));
    expect(getByText('Settings')).toBeInTheDocument();
});
//# sourceMappingURL=settings.test.js.map