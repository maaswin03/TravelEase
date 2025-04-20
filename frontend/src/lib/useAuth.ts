import { useState, useEffect } from "react";

interface UserData {
  email: string;
  name: string;
  location?: string;
  expires: string;
  rememberMe?: boolean;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | string | null>(null);;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: UserData = JSON.parse(storedUser);
      const expirationDate = new Date(user.expires);
      const currentDate = new Date();

      if (currentDate < expirationDate) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated, setIsAuthenticated };
}
