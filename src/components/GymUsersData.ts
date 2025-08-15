// Extract the user generation logic from GymUsers.tsx to make it reusable
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  membership: string;
  status: string;
  planExpiry: string;
  trainer: string;
  joinDate: string;
  lastPayment: string;
  avatar: string;
  branch: string;
  remainingAmount?: number;
}

export const generateUsers = (count: number): User[] => {
  const today = new Date('2025-08-15'); // Hardcoded date for consistency
  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const firstNames = ['Arjun', 'Priya', 'Rohit', 'Sneha', 'Amit', 'Divya', 'Rakesh', 'Neha', 'Vikash', 'Ananya', 
    'Rahul', 'Pooja', 'Sanjay', 'Aishwarya', 'Ravi', 'Meera', 'Suresh', 'Kavita', 'Vijay', 'Swati'];
  
  const lastNames = ['Sharma', 'Patel', 'Kumar', 'Reddy', 'Singh', 'Mehta', 'Verma', 'Gupta', 'Joshi', 'Das', 
    'Nair', 'Khan', 'Chowdhury', 'Shah', 'Rao', 'Malhotra', 'Banerjee', 'Agarwal', 'Yadav', 'Srivastava'];
  
  const branches = ['Stonehousepet', 'Harinathpuram', 'Vanamthopu Center', 'Current Office Center', 'Vedayapalem',
    'BV Nagar', 'Dhanalakshmi Puram'];

  const memberships = ['Basic', 'Standard', 'Premium'];
  const statuses = ['Active', 'InActive', 'pending', 'Expired'];
  const trainers = ['Rajesh', 'Nisha', 'Vikram', 'Anjali', 'Sandeep'];

  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    // Random name components
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    // Create email from name
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    
    // Generate phone number
    const phone = `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`;
    
    // Random membership and status
    const membership = memberships[Math.floor(Math.random() * memberships.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Random trainer and branch
    const trainer = trainers[Math.floor(Math.random() * trainers.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    
    const isNewMember = i <= 25; // Make 25 users new members
    
    let joinDate;
    if (isNewMember) {
      // For new members, join date is within last 30 days
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      
      const randomDaysAgo = Math.floor(Math.random() * 30);
      joinDate = new Date(today);
      joinDate.setDate(today.getDate() - randomDaysAgo);
    } else {
      // For older members, join date is between 2 years ago and 31 days ago
      const thirtyOneDaysAgo = new Date(today);
      thirtyOneDaysAgo.setDate(today.getDate() - 31);
      
      const timeDiff = thirtyOneDaysAgo.getTime() - twoYearsAgo.getTime();
      joinDate = new Date(twoYearsAgo.getTime() + Math.random() * timeDiff);
    }
    
    // Format join date as 'YYYY-MM-DD'
    const formattedJoinDate = joinDate.toISOString().split('T')[0];
    
    // Calculate plan expiry (1 year from join date)
    const planExpiry = new Date(joinDate);
    planExpiry.setFullYear(planExpiry.getFullYear() + 1);
    const formattedPlanExpiry = planExpiry.toISOString().split('T')[0];
    
    // Generate payment amount based on membership
    let paymentAmount;
    if (membership === 'Basic') paymentAmount = '₹2,500';
    else if (membership === 'Standard') paymentAmount = '₹3,500';
    else paymentAmount = '₹5,000';
    
    // Generate avatar from initials
    const avatar = `${firstName[0]}${lastName[0]}`;
    
    users.push({
      id: i,
      name: fullName,
      email,
      phone,
      membership,
      status,
      planExpiry: formattedPlanExpiry,
      trainer,
      joinDate: formattedJoinDate,
      lastPayment: paymentAmount,
      avatar,
      branch,
      // Add random remaining amount for 'pending' status users
      remainingAmount: status === 'pending' ? Math.floor(Math.random() * 2000) + 500 : 0
    });
  }
  
  return users;
};
