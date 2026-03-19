import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/login-form/login-form';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../services/authService', () => ({
  authService: {
    login: jest.fn(),
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Positive Scenarios', () => {
    it('renders the login form', () => {
      render(<LoginForm />);
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('renders login button', () => {
      render(<LoginForm />);
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('renders forgot password link', () => {
      render(<LoginForm />);
      expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    });

    it('renders email and password input fields', () => {
      render(<LoginForm />);
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('shows email error when email is empty', async () => {
      render(<LoginForm />);

      const loginButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('shows password error when password is empty', async () => {
      render(<LoginForm />);

      const loginButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('shows invalid email error', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByPlaceholderText('Email');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const loginButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('shows password length error', async () => {
      render(<LoginForm />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: '123' } });

      const loginButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
    });

    it('toggles password visibility', () => {
      render(<LoginForm />);

      const showButton = screen.getByRole('button', { name: /show/i });
      expect(showButton).toBeInTheDocument();

      fireEvent.click(showButton);
      expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();
    });
  });
});
