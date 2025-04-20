import { Button } from "@/components/ui/button";
import { PlaneIcon, MenuIcon, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated} = useAuth();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log(user)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="p-1 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-all">
            <PlaneIcon className="h-5 w-5 rotate-45 text-yellow-600 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
            TravelEase
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all"
          >
            Home
          </Link>
          <Link 
            to="/destination" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all"
          >
            Destinations
          </Link>
          <Link 
            to="/aboutus"  
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all"
          >
            About Us
          </Link>
          <Link 
            to="/contactus" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-500 hover:after:w-full after:transition-all"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons / Profile */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/account/info"
                className="hidden md:flex items-center gap-2 group"
              >
                <Avatar className="h-8 w-8 border border-yellow-400 group-hover:border-yellow-600 transition-colors">
                  <AvatarImage src={'./images/most/usericon.png'} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-600">
                    {user?.name?.charAt(0) || <UserIcon className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-600 transition-colors">
                  {user?.name?.split(' ')[0] || 'Account'}
                </span>
              </Link>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors px-3 py-1.5 rounded-md"
                onClick={() => navigate('/user/authentication?tab=login')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-md px-4 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
                onClick={() => navigate('/user/authentication?tab=signup')}
              >
                Sign Up
              </Button>
            </>
          )}
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}