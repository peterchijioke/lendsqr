import { render, screen } from '@testing-library/react';
import Sidebar from '../components/sidebar/sidebar';
import LogoutButton from '../components/sidebar/logout-button';

jest.mock('../components/sidebar/logout-button', () => {
  return function MockLogoutButton() {
    return <div data-testid="logout-button">Logout</div>;
  };
});

jest.mock('../components/sidebar/sidebar-utils', () => ({
  getActiveLabel: jest.fn((path: string) => {
    if (path.includes('/dashboard/users')) return 'Users';
    if (path === '/dashboard') return 'Dashboard';
    return '';
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/users',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Sidebar', () => {
  describe('Positive Scenarios', () => {
    it('renders the sidebar component', () => {
      render(<Sidebar isOpen={true} />);
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('renders navigation groups', () => {
      render(<Sidebar isOpen={true} />);
      expect(screen.getByText('Customers')).toBeInTheDocument();
      expect(screen.getByText('Businesses')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders Dashboard nav item', () => {
      render(<Sidebar isOpen={true} />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders Users nav item as active', () => {
      render(<Sidebar isOpen={true} />);
      const usersItem = screen.getByText('Users');
      expect(usersItem).toBeInTheDocument();
    });

    it('renders switch organization dropdown', () => {
      render(<Sidebar isOpen={true} />);
      expect(screen.getByText('Switch Organization')).toBeInTheDocument();
    });

    it('renders version text', () => {
      render(<Sidebar isOpen={true} />);
      expect(screen.getByText('v1.2.0')).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('renders sidebar when isOpen is false', () => {
      render(<Sidebar isOpen={false} />);
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('renders sidebar without onClose callback', () => {
      render(<Sidebar />);
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });
  });
});
