import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#D7092E]" />
              <span className="text-xl font-bold text-gray-900">GetSmartly.io</span>
            </div>
            <p className="text-gray-600">
              Créez et gérez vos robots conversationnels intelligents en toute simplicité.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#D7092E]">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites" className="text-gray-600 hover:text-[#D7092E]">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-[#D7092E]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#D7092E]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#D7092E]" />
                <a href="mailto:support@getsmartly.io" className="text-gray-600 hover:text-[#D7092E]">
                  support@getsmartly.io
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/getsmartly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D7092E]"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/company/getsmartly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D7092E]"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/getsmartly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D7092E]"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} GetSmartly.io. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}