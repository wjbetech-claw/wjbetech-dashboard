import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../badge';
describe('Badge', () => {
    it('renders with default variant', () => {
        render(_jsx(Badge, { children: "New" }));
        const el = screen.getByText('New');
        expect(el).toBeInTheDocument();
    });
});
//# sourceMappingURL=badge.test.js.map