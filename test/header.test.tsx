import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/header/header';

const mockGetStoredUser = jest.fn();
jest.mock('../services/authService', () => ({
  authService: {
    getStoredUser: (...args: unknown[]) => mockGetStoredUser(...args),
  },
  LoginUser: {},
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(''),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetStoredUser.mockReturnValue(null);
  });

  describe('Positive Scenarios', () => {
    it('renders the header with logo and search input', () => {
      render(<Header />);

      expect(screen.getByPlaceholderText(/search for anything/i)).toBeInTheDocument();
      expect(screen.getAllByAltText(/user/i).length).toBeGreaterThan(0);
    });

    it('renders user name from localStorage when logged in', () => {
      mockGetStoredUser.mockReturnValue({
        firstName: 'John',
        lastName: 'Doe',
      });

      render(<Header />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders "User" when no user is logged in', () => {
      render(<Header />);

      expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('calls onSearch callback when search form is submitted', () => {
      const mockOnSearch = jest.fn();
      render(<Header onSearch={mockOnSearch} />);

      const searchInput = screen.getByPlaceholderText(/search for anything/i);
      fireEvent.change(searchInput, { target: { value: 'test query' } });

      const searchForm = searchInput.closest('form');
      fireEvent.submit(searchForm!);

      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });

    it('renders Docs link', () => {
      render(<Header />);

      expect(screen.getByText('Docs')).toBeInTheDocument();
    });

    it('renders notification button', () => {
      render(<Header />);

      const notificationBtn = document.querySelector('.notificationBtn');
      expect(notificationBtn).toBeInTheDocument();
    });

    it('renders user profile section', () => {
      render(<Header />);

      const userProfile = screen.getByText('User');
      expect(userProfile).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('calls onSearch with empty string when input is empty', () => {
      const mockOnSearch = jest.fn();
      render(<Header onSearch={mockOnSearch} />);

      const searchInput = screen.getByPlaceholderText(/search for anything/i);
      const searchForm = searchInput.closest('form');
      fireEvent.submit(searchForm!);

      expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('handles onMenuClick callback when hamburger is clicked', () => {
      const mockOnMenuClick = jest.fn();
      render(<Header onMenuClick={mockOnMenuClick} isSidebarOpen={false} />);

      const hamburgerBtn = screen.getByRole('button', { name: /toggle menu/i });
      fireEvent.click(hamburgerBtn);

      expect(mockOnMenuClick).toHaveBeenCalled();
    });
  });
});
