import { authService, LoginUser, LoginCredentials } from '../services/authService';

global.fetch = jest.fn();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockLoginCredentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockLoginUser: LoginUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      email: 'test@example.com',
      organization: 'LendSqr',
      tier: 1,
      accountNumber: '1234567890',
      bankName: 'GTBank',
      status: 'active',
    };

    it('successfully logs in user and stores in localStorage', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockLoginUser,
      });

      const result = await authService.login(mockLoginCredentials);

      expect(fetch).toHaveBeenCalledWith('/api/login', {
        method: 'POST',
        body: JSON.stringify(mockLoginCredentials),
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'lendsqr_user',
        JSON.stringify(mockLoginUser)
      );
      expect(result).toEqual(mockLoginUser);
    });

    it('throws error when login fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      await expect(authService.login(mockLoginCredentials)).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('throws error when network error occurs', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(authService.login(mockLoginCredentials)).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('logout', () => {
    it('successfully logs out and removes user from localStorage', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('lendsqr_user');
      expect(result).toBe(true);
    });

    it('still removes user from localStorage even if API fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('lendsqr_user');
      expect(result).toBe(false);
    });
  });

  describe('getStoredUser', () => {
    it('returns null when no user is stored', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValueOnce(null);

      const result = authService.getStoredUser();

      expect(result).toBeNull();
    });

    it('returns user from localStorage', () => {
      const storedUser: LoginUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'john.doe',
        email: 'test@example.com',
        organization: 'LendSqr',
        tier: 1,
        accountNumber: '1234567890',
        bankName: 'GTBank',
        status: 'active',
      };

      (localStorageMock.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(storedUser)
      );

      const result = authService.getStoredUser();

      expect(result).toEqual(storedUser);
    });
  });

  describe('clearStoredUser', () => {
    it('removes user from localStorage', () => {
      authService.clearStoredUser();

      expect(localStorage.removeItem).toHaveBeenCalledWith('lendsqr_user');
    });
  });
});
