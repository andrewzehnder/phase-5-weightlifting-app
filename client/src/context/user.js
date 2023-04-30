import { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/me")
        .then ((resp) => {
          if (resp.ok) {
              resp.json().then((user) => setUser(user))
          }
    })}, []);

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  export { UserContext, UserProvider };