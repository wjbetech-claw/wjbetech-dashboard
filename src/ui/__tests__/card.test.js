import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import Card from '../card';
test('renders card', () => {
    const { getByText } = render(_jsx(Card, { title: 'Title', children: "Body" }));
    expect(getByText('Title')).toBeInTheDocument();
});
//# sourceMappingURL=card.test.js.map