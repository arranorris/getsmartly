import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter
    alert('Message envoyé avec succès !');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à nous contacter. Notre équipe vous répondra dans
            les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D7092E] focus:border-[#D7092E]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D7092E] text-white py-3 px-6 rounded-md hover:bg-[#b8072a] transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-[#FEE6E6] rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#D7092E] mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">support@getsmartly.io</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-[#D7092E] mt-1" />
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#D7092E] mt-1" />
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-gray-600">
                      123 Avenue de l'Innovation
                      <br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Horaires d'ouverture</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Lundi - Vendredi:</span> 9h00 - 18h00
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Samedi - Dimanche:</span> Fermé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}