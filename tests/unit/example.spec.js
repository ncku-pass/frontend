import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders Home views', () => {
    const { getByText } = render(Home);
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
