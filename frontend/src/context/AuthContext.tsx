import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Firebase auth listener (OTP login)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ✅ Phone OTP user
        const authUser = {
          uid: firebaseUser.uid,
          phone: firebaseUser.phoneNumber,
          name: firebaseUser.displayName || "User",
          avatar:
            firebaseUser.photoURL ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${firebaseUser.phoneNumber}`,
          provider: "firebase",
        };

        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
      } else {
        // ✅ Email/password user (backend)
        const localUser = localStorage.getItem("user");
        setUser(localUser ? JSON.parse(localUser) : null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ SAFE LOGOUT (NO 404)
  const logout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth); // firebase logout
      }
    } catch (err) {
      console.error("Firebase logout error:", err);
    } finally {
      // backend + local cleanup
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
