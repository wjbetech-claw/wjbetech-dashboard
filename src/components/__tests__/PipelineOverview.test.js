import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import PipelineOverview from '../PipelineOverview';
test('renders pipeline overview', () => {
    const { getByText } = render(_jsx(PipelineOverview, {}));
    expect(getByText('Pipeline overview')).toBeInTheDocument();
});
//# sourceMappingURL=PipelineOverview.test.js.map