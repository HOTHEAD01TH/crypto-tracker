import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PriceCard from '../components/priceCard';
import InsightCard from '../components/InsightCard';
import HistoricalChart from '../components/HistoricalChart';
import ThemeToggle from '../components/ThemeToggle';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';
import ProfileUpdateModal from '../components/ProfileUpdateModal';

// const userIconUrl = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

function Home() {
  const { user, logout, updateUser } = useAuth();
  const [coins, setCoins] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserCoins();
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUserCoins = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/user/coins', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCoins(data.watchlist);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Failed to fetch user coins:', error);
      setError('Failed to fetch coins');
    } finally {
      setIsLoading(false);
    }
  };

  const addCoin = async (coin) => {
    try {
      const response = await fetch('/api/user/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          logo: coin.thumb || coin.large
        })
      });

      if (response.ok) {
        fetchUserCoins();
      } else {
        const data = await response.json();
        console.error('Failed to add coin:', data.message);
      }
    } catch (error) {
      console.error('Failed to add coin:', error);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/news" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                News & Analytics
              </Link>
              <Link 
                to="/calculator" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Portfolio Calculator
              </Link>
              
              {user && (
                <div className="flex items-center gap-4 ml-4">
                  {/* <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                   */}
                
            
            {/* Theme Toggle */}
            
              <ThemeToggle />
             
              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
              <div className="border-l pl-4 dark:border-gray-600">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200 focus:outline-none"
                    >
                      <img 
                        src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                              alt="Profile"
                              className="w-16 h-16 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-4 py-2">
                          <button
                            onClick={() => setIsProfileModalOpen(true)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            Update Profile
                          </button>
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {!user && (
                <div className="flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            

            {/* Hamburger Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4">
            <div className="flex flex-col gap-4">
              <Link 
                to="/news" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                News & Analytics
              </Link>
              <Link 
                to="/calculator" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Portfolio Calculator
              </Link>
              {user ? (
                <>
                  <span className="text-gray-600 dark:text-gray-300">{user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <SearchBar onAddCoin={addCoin} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : coins.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No coins added yet. Use the search bar above to add some cryptocurrencies to your watchlist.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {coins.map(({ symbol, name, logo }) => (
              <div key={symbol} className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
                    <img src={logo} alt={name} className="w-10 h-10" />
                    <h2 className="text-xl font-bold">{name}</h2>
                  </div>
                  
                  <div className="p-4">
                    <PriceCard symbol={symbol} />
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700">
                    <HistoricalChart symbol={symbol} days={30} />
                  </div>
                </div>

                <InsightCard symbol={symbol} name={name} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

export default Home;