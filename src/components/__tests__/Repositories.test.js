import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import Repositories from '../Repositories';
test('Repositories renders list', () => {
    const repos = [{ name: 'r1', desc: 'd1', status: 'OK', lastCommit: 'now' }];
    render(_jsx(Repositories, { repos: repos }));
    expect(screen.getByText('r1')).toBeInTheDocument();
    expect(screen.getByText('d1')).toBeInTheDocument();
});
//# sourceMappingURL=Repositories.test.js.map