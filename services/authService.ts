
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  organization: string;
  tier: number;
  accountNumber: string;
  bankName: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
}

export interface LoginResponse {
  user: LoginUser;
  accessToken: string;
}

const USER_STORAGE_KEY = "lendsqr_user";

export const authService = {
  login: async (data: LoginCredentials): Promise<LoginUser | null> => {
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
      const user: LoginUser = await res.json();
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  logout: async (): Promise<boolean> => {
    try {
      const res = await fetch(`/api/logout`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem(USER_STORAGE_KEY);
      
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      localStorage.removeItem(USER_STORAGE_KEY);
      return false;
    }
  },
  
  getStoredUser: (): LoginUser | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },
  
  clearStoredUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};
