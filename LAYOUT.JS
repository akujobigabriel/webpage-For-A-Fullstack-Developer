
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Home", path: "Home" },
  { name: "Services", path: "Services" },
  { name: "Portfolio", path: "Portfolio" },
  { name: "About", path: "About" },
  { name: "Contact", path: "Contact" },
];

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (path) => {
    return location.pathname === createPageUrl(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --gold: #D4AF37;
          --gold-light: #F4E4A6;
          --gold-dark: #B8942F;
          --black: #1a1a1a;
          --gray: #666666;
          --light-gray: #f8f9fa;
        }
        
        .text-gold { color: var(--gold); }
        .bg-gold { background-color: var(--gold); }
        .border-gold { border-color: var(--gold); }
        .hover-gold:hover { color: var(--gold); }
        .bg-gold-light { background-color: var(--gold-light); }
        
        .gradient-gold {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center shadow-md">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Briaku Studio</h1>
                <p className="text-xs text-gray-600 font-medium">Full-Stack Development</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.path)}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActivePage(item.path) 
                      ? 'text-gold' 
                      : 'text-gray-700 hover-gold'
                  }`}
                >
                  {item.name}
                  {isActivePage(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              ))}
              <Button className="bg-gold hover:bg-gold-dark text-white shadow-md">
                <Sparkles className="w-4 h-4 mr-2" />
                Let's Work Together
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <div className="pt-4 space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActivePage(item.path)
                        ? 'text-gold bg-gold-light'
                        : 'text-gray-700 hover:bg-gray-50 hover-gold'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="w-full mt-4 bg-gold hover:bg-gold-dark text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Let's Work Together
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Briaku Studio</h1>
                  <p className="text-gold">Premium Full-Stack Development</p>
                </div>
              </div>
              <p className="text-gray-300 max-w-md">
                Crafting exceptional web experiences with cutting-edge technology 
                and elegant design. Your vision, brought to life through code.
              </p>
            </div>
            
            <div>
              <h3 className="text-gold font-semibold mb-4">Services</h3>
              <div className="space-y-2 text-gray-300">
                <p>Frontend Development</p>
                <p>Backend Development</p>
                <p>API Integration</p>
                <p>Database Design</p>
                <p>Cloud Deployment</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-gold font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-gray-300">
                <p>GabrielAkujobi@outlook.com</p>
                <p>+234-7083539924</p>
                <Link to={createPageUrl("Contact")} className="text-gold hover:underline">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Briaku Studio. Crafted with precision and passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
