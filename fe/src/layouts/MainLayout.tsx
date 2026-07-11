import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { User, ClipboardList, Home, Fingerprint, LogOut, ChevronDown } from "lucide-react";

export default function MainLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Attendance Log", href: "/attendance", icon: ClipboardList },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSignOut = () => {
        sessionStorage.removeItem("token");
        closeMenu();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/home" className="flex items-center gap-2 cursor-pointer">
                        <div className="p-1.5 bg-primary-50 text-primary-600 rounded-lg">
                            <Fingerprint size={22} />
                        </div>
                        <span className="font-extrabold text-lg text-slate-900 tracking-tight">ClockIn</span>
                    </Link>

                    <div className="relative">
                        <button 
                            onClick={toggleMenu}
                            className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent focus:border-slate-200"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                JD
                            </div>
                            <span className="text-sm font-semibold text-slate-700 hidden sm:inline">John Doe</span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMenuOpen && (
                            <div className="fixed inset-0 z-40" onClick={closeMenu} />
                        )}

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-1">
                                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                    <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Menu</p>
                                </div>

                                <div className="flex flex-col gap-0.5 px-1">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        const active = location.pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                onClick={closeMenu}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                                    active
                                                        ? "bg-primary-50 text-primary-600"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                }`}
                                            >
                                                <Icon size={16} />
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-slate-100 mt-2 pt-2 px-1">
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                                    >
                                        <LogOut size={16} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </header>

            <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}