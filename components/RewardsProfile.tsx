"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Transaction {
  type: string;
  description: string;
  points: number;
  date: string;
  isPositive: boolean;
}

export default function RewardsProfile() {
  const userPoints = 2450;
  const pointsThisMonth = 350;
  const totalRedeemed = 5;
  const drawsEntered = 12;

  const myDraws = [
    { name: "Sorteio iPhone 15", ticket: "A1234-5678", date: "2025-11-20" },
    { name: "Sorteio AirPods", ticket: "B9876-5432", date: "2025-11-15" },
    { name: "Sorteio MacBook", ticket: "C5555-1111", date: "2025-11-25" },
  ];

  const transactions: Transaction[] = [
    {
      type: "earn",
      description: "Compra na loja",
      points: 150,
      date: "2025-11-10",
      isPositive: true,
    },
    {
      type: "redeem",
      description: "Entrada no sorteio",
      points: 500,
      date: "2025-11-09",
      isPositive: false,
    },
    {
      type: "earn",
      description: "Bônus de boas-vindas",
      points: 200,
      date: "2025-11-08",
      isPositive: true,
    },
    {
      type: "earn",
      description: "Indicação de amigo",
      points: 100,
      date: "2025-11-07",
      isPositive: true,
    },
    {
      type: "redeem",
      description: "Entrada no sorteio",
      points: 200,
      date: "2025-11-06",
      isPositive: false,
    },
  ];

  const levelProgress = (userPoints / 5000) * 100;

  const names = [
    "Leonardo Matos",
    "Ana Souza",
    "Carlos Lima",
    "Mariana Rocha",
    "João Silva",
    "Paula Costa",
    "Rafael Almeida",
  ];

  const userName = useMemo(
    () => names[Math.floor(Math.random() * names.length)],
    []
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-appYellow to-appBlue rounded-full flex items-center justify-center">
          <span className="text-5xl">👤</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{userName}</h1>
        <p className="text-gray-600">Membro desde Nov 2025</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-50 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">💰</div>
          <p className="text-2xl font-bold text-appBlue">
            {userPoints.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Pontos Totais</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">📈</div>
          <p className="text-2xl font-bold text-green-600">
            +{pointsThisMonth}
          </p>
          <p className="text-sm text-gray-600">Este Mês</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🎁</div>
          <p className="text-2xl font-bold text-purple-600">{totalRedeemed}</p>
          <p className="text-sm text-gray-600">Resgates</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-50 rounded-2xl p-4"
        >
          <div className="text-3xl mb-2">🎫</div>
          <p className="text-2xl font-bold text-yellow-600">{drawsEntered}</p>
          <p className="text-sm text-gray-600">Sorteios</p>
        </motion.div>
      </div>

      {/* Level Progress */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nível Atual</p>
            <p className="text-xl font-bold text-gray-900">Silver</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Próximo Nível</p>
            <p className="text-xl font-bold text-appBlue">Gold</p>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-appBlue to-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          {userPoints.toLocaleString()} / 5,000 pontos
        </p>
      </div>

      {/* My Draws */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Meus Sorteios</h3>
        <div className="space-y-3">
          {myDraws.map((draw, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{draw.name}</h4>
                  <p className="text-sm text-gray-600">
                    Bilhete: {draw.ticket}
                  </p>
                </div>
                <span className="text-xs bg-appYellow/20 text-gray-700 px-2 py-1 rounded-full font-medium">
                  {new Date(draw.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Histórico de Pontos
        </h3>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between bg-slate-50 rounded-2xl p-4"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.isPositive ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <span className="text-xl">
                    {transaction.isPositive ? "+" : "-"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(transaction.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <p
                className={`font-bold ${
                  transaction.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.isPositive ? "+" : "-"}
                {transaction.points}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Configurações</h3>
        <div className="space-y-3">
          <button className="w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-100 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔔</span>
              <span className="font-medium text-gray-900">Notificações</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-100 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">❓</span>
              <span className="font-medium text-gray-900">Ajuda</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full bg-red-50 rounded-2xl p-4 flex items-center justify-between hover:bg-red-100 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚪</span>
              <span className="font-medium text-red-600">Sair</span>
            </div>
            <span className="text-red-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
