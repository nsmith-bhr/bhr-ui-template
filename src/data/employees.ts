export interface Employee {
  id: number;
  name: string;
  department: string;
  location: string;
  division: string;
  email: string;
  phone: string;
  reportsTo: string;
  directReports: number;
  avatar: string;
}

export const employees: Employee[] = [
  // Cryptozoology
  {
    id: 1,
    name: 'Ava Martinez',
    department: 'Cryptozoology',
    location: 'Hercules, CA',
    division: 'North America',
    email: 'ava.martinez@bamboohr.com',
    phone: '(510) 555-0142',
    reportsTo: 'Director',
    directReports: 4,
    avatar: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 2,
    name: 'Ben Thompson',
    department: 'Cryptozoology',
    location: 'Remote',
    division: 'North America',
    email: 'ben.thompson@bamboohr.com',
    phone: '(555) 555-0198',
    reportsTo: 'Manager',
    directReports: 2,
    avatar: 'https://i.pravatar.cc/300?img=12',
  },

  // Customer Success
  {
    id: 3,
    name: 'Charlotte Webb',
    department: 'Customer Success',
    location: 'Lindon, Utah',
    division: 'CA-UT',
    email: 'charlotte.webb@bamboohr.com',
    phone: '(801) 555-0156',
    reportsTo: 'Manager',
    directReports: 5,
    avatar: 'https://i.pravatar.cc/300?img=45',
  },
  {
    id: 4,
    name: 'David Kim',
    department: 'Customer Success',
    location: 'Sydney, Australia',
    division: 'Asia-Pacific',
    email: 'david.kim@bamboohr.com',
    phone: '+61 2 555 0187',
    reportsTo: 'Director',
    directReports: 8,
    avatar: 'https://i.pravatar.cc/300?img=15',
  },

  // Finance
  {
    id: 5,
    name: 'Emma Wilson',
    department: 'Finance',
    location: 'London, UK',
    division: 'Europe',
    email: 'emma.wilson@bamboohr.com',
    phone: '+44 20 555 0143',
    reportsTo: 'VP Finance',
    directReports: 6,
    avatar: 'https://i.pravatar.cc/300?img=44',
  },
  {
    id: 6,
    name: 'Frank Rodriguez',
    department: 'Finance',
    location: 'Hercules, CA',
    division: 'North America',
    email: 'frank.rodriguez@bamboohr.com',
    phone: '(510) 555-0129',
    reportsTo: 'Manager',
    directReports: 3,
    avatar: 'https://i.pravatar.cc/300?img=13',
  },

  // Human Resources
  {
    id: 7,
    name: 'Grace Anderson',
    department: 'Human Resources',
    location: 'Lindon, Utah',
    division: 'CA-UT',
    email: 'grace.anderson@bamboohr.com',
    phone: '(801) 555-0167',
    reportsTo: 'VP HR',
    directReports: 7,
    avatar: 'https://i.pravatar.cc/300?img=48',
  },
  {
    id: 8,
    name: 'Henry Cooper',
    department: 'Human Resources',
    location: 'Remote',
    division: 'North America',
    email: 'henry.cooper@bamboohr.com',
    phone: '(555) 555-0134',
    reportsTo: 'Manager',
    directReports: 2,
    avatar: 'https://i.pravatar.cc/300?img=11',
  },

  // IT
  {
    id: 9,
    name: 'Isabella Garcia',
    department: 'IT',
    location: 'Vancouver, Canada',
    division: 'North America',
    email: 'isabella.garcia@bamboohr.com',
    phone: '+1 604 555 0178',
    reportsTo: 'Director',
    directReports: 9,
    avatar: 'https://i.pravatar.cc/300?img=49',
  },
  {
    id: 10,
    name: 'Jack Bennett',
    department: 'IT',
    location: 'Hercules, CA',
    division: 'North America',
    email: 'jack.bennett@bamboohr.com',
    phone: '(510) 555-0191',
    reportsTo: 'Manager',
    directReports: 4,
    avatar: 'https://i.pravatar.cc/300?img=14',
  },

  // Logistics
  {
    id: 11,
    name: 'Katherine Lee',
    department: 'Logistics',
    location: 'Sydney, Australia',
    division: 'Asia-Pacific',
    email: 'katherine.lee@bamboohr.com',
    phone: '+61 2 555 0152',
    reportsTo: 'Manager',
    directReports: 3,
    avatar: 'https://i.pravatar.cc/300?img=32',
  },

  // Marketing
  {
    id: 12,
    name: 'Liam Foster',
    department: 'Marketing',
    location: 'London, UK',
    division: 'Europe',
    email: 'liam.foster@bamboohr.com',
    phone: '+44 20 555 0165',
    reportsTo: 'VP Marketing',
    directReports: 8,
    avatar: 'https://i.pravatar.cc/300?img=17',
  },
  {
    id: 13,
    name: 'Mia Turner',
    department: 'Marketing',
    location: 'Remote',
    division: 'Europe',
    email: 'mia.turner@bamboohr.com',
    phone: '+44 20 555 0172',
    reportsTo: 'Manager',
    directReports: 4,
    avatar: 'https://i.pravatar.cc/300?img=29',
  },

  // Operations
  {
    id: 14,
    name: 'Noah Jackson',
    department: 'Operations',
    location: 'Lindon, Utah',
    division: 'CA-UT',
    email: 'noah.jackson@bamboohr.com',
    phone: '(801) 555-0183',
    reportsTo: 'Director',
    directReports: 6,
    avatar: 'https://i.pravatar.cc/300?img=52',
  },

  // Product
  {
    id: 15,
    name: 'Olivia Parker',
    department: 'Product',
    location: 'Hercules, CA',
    division: 'North America',
    email: 'olivia.parker@bamboohr.com',
    phone: '(510) 555-0146',
    reportsTo: 'VP Product',
    directReports: 10,
    avatar: 'https://i.pravatar.cc/300?img=26',
  },
  {
    id: 16,
    name: 'Peter Chen',
    department: 'Product',
    location: 'Vancouver, Canada',
    division: 'North America',
    email: 'peter.chen@bamboohr.com',
    phone: '+1 604 555 0159',
    reportsTo: 'Manager',
    directReports: 5,
    avatar: 'https://i.pravatar.cc/300?img=60',
  },

  // Sales
  {
    id: 17,
    name: 'Quinn Mitchell',
    department: 'Sales',
    location: 'Lindon, Utah',
    division: 'CA-UT',
    email: 'quinn.mitchell@bamboohr.com',
    phone: '(801) 555-0194',
    reportsTo: 'Director',
    directReports: 7,
    avatar: 'https://i.pravatar.cc/300?img=33',
  },
  {
    id: 18,
    name: 'Rachel Davis',
    department: 'Sales',
    location: 'Sydney, Australia',
    division: 'Asia-Pacific',
    email: 'rachel.davis@bamboohr.com',
    phone: '+61 2 555 0168',
    reportsTo: 'Manager',
    directReports: 4,
    avatar: 'https://i.pravatar.cc/300?img=43',
  },

  // Security
  {
    id: 19,
    name: 'Samuel Wright',
    department: 'Security',
    location: 'Remote',
    division: 'North America',
    email: 'samuel.wright@bamboohr.com',
    phone: '(555) 555-0175',
    reportsTo: 'Director',
    directReports: 3,
    avatar: 'https://i.pravatar.cc/300?img=68',
  },

  // Technology
  {
    id: 20,
    name: 'Taylor Morgan',
    department: 'Technology',
    location: 'Hercules, CA',
    division: 'North America',
    email: 'taylor.morgan@bamboohr.com',
    phone: '(510) 555-0188',
    reportsTo: 'VP Technology',
    directReports: 12,
    avatar: 'https://i.pravatar.cc/300?img=20',
  },
  {
    id: 21,
    name: 'Uma Patel',
    department: 'Technology',
    location: 'London, UK',
    division: 'Europe',
    email: 'uma.patel@bamboohr.com',
    phone: '+44 20 555 0181',
    reportsTo: 'Manager',
    directReports: 6,
    avatar: 'https://i.pravatar.cc/300?img=38',
  },

  // UX
  {
    id: 22,
    name: 'Victor Ramirez',
    department: 'UX',
    location: 'Vancouver, Canada',
    division: 'North America',
    email: 'victor.ramirez@bamboohr.com',
    phone: '+1 604 555 0193',
    reportsTo: 'Manager',
    directReports: 4,
    avatar: 'https://i.pravatar.cc/300?img=59',
  },
  {
    id: 23,
    name: 'Willow Hayes',
    department: 'UX',
    location: 'Remote',
    division: 'North America',
    email: 'willow.hayes@bamboohr.com',
    phone: '(555) 555-0161',
    reportsTo: 'Manager',
    directReports: 3,
    avatar: 'https://i.pravatar.cc/300?img=27',
  },
];
