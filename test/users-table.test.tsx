import { render, screen } from '@testing-library/react';
import UsersTable from '../components/users-table/users-table';

jest.mock('../components/table', () => {
  return ({ data, renderCell, columns }: any) => (
    <table>
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, idx: number) => (
          <tr key={idx}>
            {columns.map((col: any) => (
              <td key={col.key}>{renderCell(row, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

jest.mock('../components/more-menu/more-menu', () => {
  return ({ onClose, onViewDetails }: any) => (
    <div data-testid="more-menu">
      <button onClick={onClose}>Close</button>
      <button onClick={() => onViewDetails('1')}>View</button>
    </div>
  );
});

jest.mock('../components/filter-dropdown/filter-dropdown', () => {
  return ({ onClose, onFilter }: any) => (
    <div data-testid="filter-dropdown">
      <button onClick={onClose}>Close</button>
      <button onClick={() => onFilter({})}>Apply</button>
    </div>
  );
});

jest.mock('../components/pagination', () => {
  return ({ totalItems, onPageChange }: any) => (
    <div data-testid="pagination">
      <span>{totalItems} items</span>
      <button onClick={() => onPageChange(2)}>Next</button>
    </div>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(''),
}));

interface Personal {
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  relationship: string;
}

interface User {
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
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  dateJoined: string;
  avatar: null | string;
  personal: Personal;
  guarantors: Guarantor[];
}

interface Organization {
  id: number;
  name: string;
}

const mockOrganizations: Organization[] = [
  { id: 1, name: 'LendSqr' },
  { id: 2, name: 'CreditPro' },
];

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    username: 'john.doe',
    name: 'John Doe',
    organization: 'LendSqr',
    tier: 1,
    balance: '10000',
    accountNumber: '1234567890',
    bankName: 'GTBank',
    status: 'active',
    dateJoined: 'Jan 1, 2024',
    avatar: null,
    personal: {
      phoneNumber: '08012345678',
      emailAddress: 'john@example.com',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: '0',
      typeOfResidence: 'Own House',
    },
    guarantors: [],
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'jane.smith',
    name: 'Jane Smith',
    organization: 'CreditPro',
    tier: 2,
    balance: '20000',
    accountNumber: '0987654321',
    bankName: 'Kuda Bank',
    status: 'inactive',
    dateJoined: 'Feb 1, 2024',
    avatar: null,
    personal: {
      phoneNumber: '08098765432',
      emailAddress: 'jane@example.com',
      bvn: '10987654321',
      gender: 'Female',
      maritalStatus: 'Married',
      children: '1',
      typeOfResidence: 'Rented Apartment',
    },
    guarantors: [],
  },
];

describe('UsersTable', () => {
  describe('Positive Scenarios', () => {
    it('renders the users table with data', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders pagination with correct total items', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} />
      );

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByText('2 items')).toBeInTheDocument();
    });

    it('renders table columns', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} />
      );

      expect(screen.getByText('ORGANIZATION')).toBeInTheDocument();
      expect(screen.getByText('USERNAME')).toBeInTheDocument();
      expect(screen.getByText('EMAIL')).toBeInTheDocument();
      expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument();
      expect(screen.getByText('DATE JOINED')).toBeInTheDocument();
      expect(screen.getByText('STATUS')).toBeInTheDocument();
    });

    it('filters users by search query - name', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="John" />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('filters users by search query - email', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="jane@example.com" />
      );

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('filters users by search query - account number', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="1234567890" />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('shows all users when search query is empty', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="" />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('handles empty users array', () => {
      render(
        <UsersTable users={[]} organizations={mockOrganizations} />
      );

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByText('0 items')).toBeInTheDocument();
    });

    it('shows no results when search does not match', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="nonexistent" />
      );

      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      expect(screen.getByText('0 items')).toBeInTheDocument();
    });

    it('handles case-insensitive search', () => {
      render(
        <UsersTable users={mockUsers} organizations={mockOrganizations} searchQuery="JOHN" />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
