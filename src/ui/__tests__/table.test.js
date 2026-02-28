import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { Table, THead, TBody, TR, TH, TD } from '../table';
test('renders table', () => {
    const { getByText } = render(_jsxs(Table, { children: [_jsx(THead, { children: _jsx(TR, { children: _jsx(TH, { children: "Col" }) }) }), _jsx(TBody, { children: _jsx(TR, { children: _jsx(TD, { children: "Row" }) }) })] }));
    expect(getByText('Row')).toBeInTheDocument();
});
//# sourceMappingURL=table.test.js.map