import { Link } from "react-router-dom";
import Button from "@components/ui/Button";

function Header() {
  return (
    <header className="bg-[var(--nexa)] text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Mon Application
        </Link>
        <nav className="flex gap-4">
          <Button>
            <Link to="/quizz/create" className="hover:underline">
              Créer un Quiz
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
