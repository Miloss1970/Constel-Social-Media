import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { callApi } from "../../service/service";

function AuthGuarding({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let account = await callApi({ method: "GET", url: "accounts/me" });

        if (account) setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default AuthGuarding;
