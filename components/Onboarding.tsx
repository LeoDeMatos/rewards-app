"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [cpf, setCpf] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    cep: "",
    email: "",
    acceptedTerms: false,
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return formData.cep;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, cep: formatCEP(e.target.value) });
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.cep.length === 9 &&
      formData.email.includes("@") &&
      formData.acceptedTerms
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-md w-full"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-appYellow to-appBlue rounded-full flex items-center justify-center"
            >
              <span className="text-6xl">⭐</span>
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Bem-vindo!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Junte pontos e concorra a prêmios incríveis
            </p>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-appBlue text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Começar
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="cpf"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Seu CPF</h2>
            <p className="text-gray-600 mb-8">
              Digite seu CPF para continuar
            </p>

            <input
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none text-lg mb-6"
            />

            <button
              onClick={() => setStep(2)}
              disabled={cpf.length < 14}
              className="w-full bg-appBlue text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Continuar
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Suas Informações
            </h2>
            <p className="text-gray-600 mb-6">Complete seu cadastro</p>

            <div className="space-y-4">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Nome"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none"
              />

              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Sobrenome"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none"
              />

              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                placeholder="Data de Nascimento"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none"
              />

              <input
                type="text"
                value={formData.cep}
                onChange={handleCEPChange}
                placeholder="CEP"
                maxLength={9}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none"
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="E-mail"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-appBlue focus:outline-none"
              />

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptedTerms: e.target.checked })
                  }
                  className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-appBlue focus:ring-appBlue"
                />
                <span className="text-sm text-gray-700">
                  Estou de acordo com o Regulamento do Programa
                </span>
              </label>
            </div>

            <button
              onClick={onComplete}
              disabled={!isFormValid()}
              className="w-full bg-appBlue text-white py-4 rounded-2xl font-semibold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Finalizar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
