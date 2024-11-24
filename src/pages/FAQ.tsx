import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "Qu'est-ce que GetSmartly.io ?",
      answer:
        "GetSmartly.io est une plateforme SaaS qui permet de créer et gérer des robots conversationnels intelligents basés sur ChatGPT 3.5 d'OpenAI. Notre solution permet aux entreprises de personnaliser leurs chatbots et d'analyser leurs performances.",
    },
    {
      question: "Comment fonctionne l'intégration avec ChatGPT ?",
      answer:
        "GetSmartly.io utilise l'API officielle d'OpenAI pour intégrer les capacités de ChatGPT 3.5. Vous pouvez personnaliser les instructions et le comportement de vos chatbots tout en bénéficiant de la puissance de l'IA d'OpenAI.",
    },
    {
      question: "Quels sont les formats d'export disponibles ?",
      answer:
        "Vous pouvez exporter vos conversations et analyses au format CSV pour un traitement dans des tableurs, ou en PDF pour une lecture plus facile. Ces exports incluent toutes les métadonnées importantes.",
    },
    {
      question: "Comment puis-je personnaliser mon chatbot ?",
      answer:
        "Notre interface permet de définir le ton, le style de communication, les connaissances spécifiques et les règles de comportement de votre chatbot. Vous pouvez également créer des réponses prédéfinies pour des questions fréquentes.",
    },
    {
      question: "Quelles sont les options de tarification ?",
      answer:
        "Nous proposons plusieurs forfaits adaptés à différents besoins, du plan gratuit pour tester la plateforme aux plans entreprise pour des besoins plus importants. Contactez-nous pour plus de détails.",
    },
    {
      question: "La plateforme est-elle conforme au RGPD ?",
      answer:
        "Oui, GetSmartly.io est entièrement conforme au RGPD. Nous prenons la protection des données très au sérieux et mettons en place toutes les mesures nécessaires pour garantir la sécurité de vos informations.",
    },
    {
      question: "Quel support est disponible ?",
      answer:
        "Nous offrons un support par email pour tous les utilisateurs et un support prioritaire par téléphone pour les plans premium. Notre documentation en ligne est également très complète.",
    },
    {
      question: "Puis-je essayer GetSmartly.io gratuitement ?",
      answer:
        "Oui, nous proposons une période d'essai gratuite de 14 jours avec accès à toutes les fonctionnalités premium. Aucune carte bancaire n'est requise pour l'essai.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez les réponses à vos questions sur GetSmartly.io
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#D7092E]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#D7092E]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}