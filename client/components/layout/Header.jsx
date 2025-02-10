import { Link } from "react-router-dom";
import Button from "@components/ui/Button";
import React, { useEffect, useState } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="bg-[var(--nexa)] text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Mon Application
        </Link>
        <nav className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Button>
                <Link to="/quizz/create" className="hover:underline">
                  Créer un Quiz
                </Link>
              </Button>
              <Button extraClass="bg-red-500 text-white" onClick={logout}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Button>
                <Link to="/auth/register" className="hover:underline">
                  Créer un compte
                </Link>
              </Button>
              <Button>
                <Link to="/auth/login" className="hover:underline">
                  Se connecter
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;