import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Kanban from '../kanban/Kanban';
describe('Kanban', () => {
    beforeEach(() => { localStorage.clear(); });
    test('renders and moves card', () => {
        render(_jsx(Kanban, {}));
        const root = screen.getByTestId('kanban-root');
        expect(root).toBeInTheDocument();
        const todo = screen.getByText(/To Do/);
        expect(todo).toBeInTheDocument();
        const moveBtn = screen.getByText(/Move to Doing/);
        fireEvent.click(moveBtn);
        expect(screen.getByText('Sample task')).toBeInTheDocument();
    });
});
//# sourceMappingURL=Kanban.test.js.map