import UserDetailsClient from "@/components/user-details/user-details-client";

interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
}

interface Employment {
  education: string;
  status: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

interface Guarantor {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
}

interface User {
  name: string;
  id: string;
  tier: number;
  balance: string;
  account: string;
  personal: PersonalInfo;
  employment: Employment;
  socials: Socials;
  guarantors: Guarantor[];
}

const USERS: Record<string, User> = {
  "1": {
    name: "Grace Effiom",
    id: "LSQFf587g90",
    tier: 2,
    balance: "₦200,000.00",
    account: "9912345678/Providus Bank",
    personal: {
      fullName: "Grace Effiom",
      phone: "07060780922",
      email: "grace@gmail.com",
      bvn: "07060780922",
      gender: "Female",
      maritalStatus: "Single",
      children: "None",
      residenceType: "Parent's Apartment",
    },
    employment: {
      education: "B.Sc",
      status: "Employed",
      sector: "FinTech",
      duration: "2 years",
      officeEmail: "grace@lendsqr.com",
      monthlyIncome: "₦200,000.00– ₦400,000.00",
      loanRepayment: "40,000",
    },
    socials: {
      twitter: "@grace_effiom",
      facebook: "Grace Effiom",
      instagram: "@grace_effiom",
    },
    guarantors: [
      {
        fullName: "Debby Ogana",
        phone: "07060780922",
        email: "debby@gmail.com",
        relationship: "Sister",
      },
      {
        fullName: "Debby Ogana",
        phone: "07060780922",
        email: "debby@gmail.com",
        relationship: "Sister",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = USERS[id] || USERS["1"];

  return <UserDetailsClient user={user} />;
}
