import Link from "next/link";
import Sidebar from "./Sidebar";
import '@/app/css/menu.css';

export default function Menu() {
  return (
    <nav className="menu">
      {/* Sidebar para la navegacion lateral */}
      <Sidebar />

      {/* Enlaces principales */}
      <div className="links flex space-x-4">
        <Link href="/pages/register" className="text-blue-500 hover:text-blue-700 font-semibold">
          Registro
        </Link>
        <Link href="/pages/login" className="text-blue-500 hover:text-blue-700 font-semibold">
          Login
        </Link>
      </div>

      {/* Enlace al perfil del usuario */}
      <div className="profile">
        <Link href="/pages/profile" className="text-blue-500 hover:text-blue-700 font-semibold">
          Perfil
        </Link>
      </div>
    </nav>
  );
}
