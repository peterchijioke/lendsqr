import { Organization, OrganizationsResponse, UsersResponse } from "@/app/dashboard/users/page";

export interface Personal {
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

export interface Education {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: {
    min: number;
    max: number;
  };
  loanRepayment: number;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  relationship: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  organization: string;
  tier: number;
  balance: string;
  accountNumber: string;
  bankName: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  dateJoined: string;
  avatar: null | string;
  personal: Personal;
  education?: Education;
  socials?: Socials;
  guarantors: Guarantor[];
}



export interface Stat {
  label: string;
  value: string;
  icon: string;
  variant: "pink" | "purple" | "orange" | "red";
  transform?: string;
}

export interface StatsResponse {
  data: Stat[];
}

const getApiUrl = () => {
  // Use the environment variable if available (Vercel), otherwise use relative URL (development)
  return process.env.NEXT_PUBLIC_API_URL || '';
};



export const userService = {

  getUser:async (id: string): Promise<User | null> =>{
    try {
      const res = await fetch(`${getApiUrl()}/api/users/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) {
          return null;
        }
        throw new Error("Failed to fetch user");
      }

      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
  getUsers:async(): Promise<User[]>=> {
    try {
      const apiUrl = getApiUrl();
      console.log('Fetching users from:', `${apiUrl}/api/users?limit=500`);
      
      const res = await fetch(`${apiUrl}/api/users?limit=500`, {
        cache: 'no-store',
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
      }
      
      const response: UsersResponse = await res.json();
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
  getOrganizations:async(): Promise<Organization[]>=> {
    try {
      const res = await fetch(
        `${getApiUrl()}/api/organisations`,
        {
          cache: "no-store",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch organisations");
      }

      const response: OrganizationsResponse = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return [];
    }
  },
  getDashboardStats:async(): Promise<Stat[]>=> {
    try {
      const res = await fetch(`${getApiUrl()}/api/stats`, {
        cache: 'no-store',
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      const response: StatsResponse = await res.json();
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return [];
    }
  }
}
