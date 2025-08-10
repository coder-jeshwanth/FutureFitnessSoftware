import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Dumbbell, 
  Calendar, 
  ClipboardCheck, 
  CreditCard, 
  Package, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  X,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { FiSidebar } from "react-icons/fi";
import logoImage from './components/Images/logo.png';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GymUsers from './components/GymUsers';
import Trainers from './components/Trainers';
import WorkoutPlans from './components/WorkoutPlans';
import ClassSchedule from './components/ClassSchedule';
import Attendance from './components/Attendance';
import Payments from './components/Payments';
import Subscriptions from './components/Subscriptions';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import AppSettings from './components/Settings';

// All available branches
const branches = [
  'All Branches',
  'Stonehousepet',
  'Harinathpuram',
  'Vanamthopu Center',
  'Current Office Center',
  'Vedayapalem',
  'BV Nagar',
  'Dhanalakshmi Puram'
];

const menuItems = [
  {
    section: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'users', label: 'Gym Users', icon: Users },
      { id: 'trainers', label: 'Trainers / Staff', icon: UserCheck },
      { id: 'workouts', label: 'Workout Plans', icon: Dumbbell },
      { id: 'classes', label: 'Class Schedule', icon: Calendar },
      { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    ]
  },
  {
    section: 'Business',
    items: [
      { id: 'payments', label: 'Payments & Billing', icon: CreditCard },
      { id: 'subscriptions', label: 'Subscription Plans', icon: Package },
      { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ]
  },
  {
    section: 'System',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];


function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{email: string; name: string} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBranchDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check for saved authentication state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication check (in a real app, this would be an API call)
    if (email === 'admin@futurefitness.com' && password === 'admin123') {
      const user = { email, name: 'Admin User' };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      alert('Invalid credentials. Use admin@futurefitness.com / admin123');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    setActiveMenu('dashboard');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <Dashboard selectedBranch={selectedBranch} />;
      case 'users': return <GymUsers selectedBranch={selectedBranch} />;
      case 'trainers': return <Trainers selectedBranch={selectedBranch} />;
      case 'workouts': return <WorkoutPlans />;
      case 'classes': return <ClassSchedule />;
      case 'attendance': return <Attendance selectedBranch={selectedBranch} />;
      case 'payments': return <Payments selectedBranch={selectedBranch} />;
      case 'subscriptions': return <Subscriptions />;
      case 'reports': return <Reports />;
      case 'notifications': return <Notifications />;
      case 'settings': return <AppSettings />;
      default: return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-black flex">
      {/* Sidebar Overlay (only for mobile screens) */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-[#2A3037] text-white transform transition-all duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'w-72' : 'w-16'}
      `}>
        <div className={`flex items-center ${sidebarOpen ? 'justify-between h-56 px-6' : 'justify-center h-20 px-0'} border-b border-gray-700`}>
          {sidebarOpen ? (
            <>
              <div className="flex-1 flex justify-center">
                <img src={logoImage} alt="Future Fitness Logo" className="h-[100px] w-[120px] p-0" />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-[#E7EFEA] hover:text-white lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src={logoImage} alt="Future Fitness Logo" className="h-[40px] w-[48px]" />
            </div>
          )}
        </div>
        
       <div className="flex flex-col h-[calc(100%-14rem)]"> {/* Create a flex container to manage the content and logout button */}
         <nav className={`${sidebarOpen ? 'mt-8 px-4' : 'mt-6'} text-sm flex-grow ${sidebarOpen ? 'overflow-y-auto' : 'overflow-visible'}`}>
           {menuItems.map((group, index) => (
             <div key={index} className={`${sidebarOpen ? 'mb-10' : 'mb-4'}`}>
               {sidebarOpen && (
                 <h4 className="text-gray-400 font-semibold mb-3 uppercase text-xs tracking-wide px-1">
                   {group.section}
                 </h4>
               )}
               {group.items.map((item) => {
                 const Icon = item.icon;
                 return (
                   <button
                     key={item.id}
                     onClick={() => {
                       setActiveMenu(item.id);
                       // Don't close sidebar when clicking menu items
                     }}
                     className={`w-full ${sidebarOpen ? 'flex items-center space-x-3 px-4 py-3 text-left' : 'flex justify-center py-3'} mb-2 rounded-lg transition-colors duration-200
                       ${activeMenu === item.id
                         ? 'bg-[#7BC843] text-[black] shadow-lg'
                         : 'text-gray-300 hover:bg-[#7BC843] hover:text-[black]'}
                     `}
                     title={!sidebarOpen ? item.label : ""}
                   >
                     <Icon className={`${sidebarOpen ? 'h-5 w-5' : 'h-6 w-6'}`} />
                     {sidebarOpen && <span className="font-medium">{item.label}</span>}
                   </button>
                 );
               })}
             </div>
           ))}
         </nav>

         {/* Logout button placed at bottom of sidebar with proper margin */}
         <div className={`${sidebarOpen ? 'px-4' : 'px-0'} py-4 mt-auto border-t border-gray-700`}>
           <button 
             onClick={handleLogout}
             className={`w-full ${sidebarOpen ? 'flex items-center space-x-3 px-4 py-3 text-left' : 'flex justify-center py-3'} text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200`}
             title={!sidebarOpen ? "Logout" : ""}
           >
             <LogOut className={`${sidebarOpen ? 'h-5 w-5' : 'h-6 w-6'}`} />
             {sidebarOpen && <span className="font-medium">Logout</span>}
           </button>
         </div>
       </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden bg-black transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-16'}`}>
        {/* Header */}
        <header className="bg-black shadow-sm h-20 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button (visible on all screens) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-300 hover:text-white flex items-center justify-center p-2 rounded-lg hover:bg-[#2A3037] transition-colors"
              aria-label="Toggle Sidebar"
              title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <FiSidebar className="h-6 w-6 text-white" />
            </button>
            <h2 className="text-3xl font-bold text-white capitalize">
              {menuItems.flatMap(section => section.items).find(item => item.id === activeMenu)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* Branch Dropdown - Show on Dashboard, Gym Users, Trainers, Attendance and Payments pages */}
            {(activeMenu === 'users' || activeMenu === 'dashboard' || activeMenu === 'trainers' || activeMenu === 'attendance' || activeMenu === 'payments') && (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 bg-[#2A3037] text-gray-300 text-sm rounded-lg hover:bg-[#3A4049] transition-colors"
                >
                  <MapPin className="h-4 w-4 text-[#7BC843]" />
                  <span className="hidden sm:inline">{selectedBranch}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showBranchDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-[#2A3037] ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {branches.map((branch) => (
                        <button
                          key={branch}
                          onClick={() => {
                            setSelectedBranch(branch);
                            setShowBranchDropdown(false);
                          }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            selectedBranch === branch 
                              ? 'bg-[#3A4049] text-[#7BC843]' 
                              : 'text-gray-300 hover:bg-[#3A4049] hover:text-[#7BC843]'
                          }`}
                          role="menuitem"
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-8 h-8 bg-[#7BC843] rounded-full flex items-center justify-center">
                <span className="text-black font-medium">{currentUser?.name.charAt(0) || 'A'}</span>
              </div>
              <span className="text-2xl text-white">{currentUser?.name || 'Admin User'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-black">
          {renderContent()}
        </main>
      </div>
        </div>
      )}
    </>
  );
}

export default App;