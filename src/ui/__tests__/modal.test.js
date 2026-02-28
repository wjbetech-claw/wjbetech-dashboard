import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { Modal } from '../modal';
test('renders modal when open', () => {
    const { getByText } = render(_jsx(Modal, { open: true, onClose: () => { }, title: "Title", children: "Content" }));
    expect(getByText('Content')).toBeInTheDocument();
});
//# sourceMappingURL=modal.test.js.map