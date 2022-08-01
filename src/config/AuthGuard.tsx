import * as React from "react";

const authProvider = {
  isAuthenticated: false,
  
  signin(callback: VoidFunction) {
    console.log('check');
    
    authProvider.isAuthenticated = localStorage.accessToken;
    setTimeout(callback, 100);
  },
};

interface AuthContextType {
  token: any;
  signin: (token: string, callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [token, setToken] = React.useState<any>(localStorage.accessToken);

  let signin = (newToken: string, callback: VoidFunction) => {
    return authProvider.signin(() => {
      setToken(newToken);
      callback();
    });
  };

  let value = { token, signin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthGuard() {
  let auth = useAuth();
  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return false;
  }

  return true;
}