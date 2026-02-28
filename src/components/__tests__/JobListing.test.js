import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import JobListing from '../JobListing';
test('JobListing renders jobs', () => {
    const list = [{ title: 'Job A', company: 'Co' }];
    render(_jsx(JobListing, { list: list }));
    expect(screen.getByText(/Job A/)).toBeInTheDocument();
    expect(screen.getByText(/Co/)).toBeInTheDocument();
});
//# sourceMappingURL=JobListing.test.js.map