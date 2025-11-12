"use client";

import { motion } from "framer-motion";

interface Prize {
  name: string;
  points: number;
  icon: string;
  color: string;
  category: string;
  progress: number;
}

interface Draw {
  name: string;
  date: string;
  entryCost: number;
  prize: string;
  participants: number;
}

export default function RewardsHome() {
  const names = ["Ana", "Bruno", "Camila", "Diego", "Elisa", "Felipe", "Gabriela"];
  const userName = names[Math.floor(Math.random() * names.length)];
  const userPoints = Math.floor(10000 + Math.random() * 70000);

  const prizes: Prize[] = [
    // Only cash prizes (vales) per user request
    {
      name: "Vale R$ 50",
      points: 5000,
      icon: "💵",
      color: "bg-green-500",
      category: "Dinheiro",
      progress: 100,
    },
    {
      name: "Vale R$ 100",
      points: 10000,
      icon: "💵",
      color: "bg-green-600",
      category: "Dinheiro",
      progress: 80,
    },
    {
      name: "Vale R$ 200",
      points: 20000,
      icon: "💵",
      color: "bg-green-700",
      category: "Dinheiro",
      progress: 60,
    },
    {
      name: "Vale R$ 500",
      points: 50000,
      icon: "💵",
      color: "bg-green-800",
      category: "Dinheiro",
      progress: 30,
    },
  ];

  const activeDraws: Draw[] = [
    {
      name: "Sorteio Vale R$ 500",
      date: "2025-11-20",
      entryCost: 5000,
      prize: "R$ 500",
      participants: 1234,
    },
    {
      name: "Sorteio Vale R$ 200",
      date: "2025-11-15",
      entryCost: 2000,
      prize: "R$ 200",
      participants: 2456,
    },
    {
      name: "Sorteio Vale R$ 1000",
      date: "2025-11-25",
      entryCost: 10000,
      prize: "R$ 1000",
      participants: 876,
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-slate-50 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Olá, {userName}! 👋
        </h1>
        <p className="text-gray-600">Confira seus pontos e prêmios</p>
      </div>

      {/* Points Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-appBlue to-blue-600 rounded-3xl p-6 mb-8 text-white shadow-lg"
      >
        <p className="text-sm opacity-90 mb-2">Seus Pontos</p>
        <h2 className="text-5xl font-bold mb-4">{userPoints.toLocaleString()}</h2>
        <div className="flex space-x-3">
          <button className="flex-1 bg-slate-800/20 backdrop-blur-sm py-2 rounded-xl text-sm font-medium hover:bg-slate-800/30 transition-colors">
            Ganhar
          </button>
          <button className="flex-1 bg-slate-800/20 backdrop-blur-sm py-2 rounded-xl text-sm font-medium hover:bg-slate-800/30 transition-colors">
            Resgatar
          </button>
          <button className="flex-1 bg-slate-800/20 backdrop-blur-sm py-2 rounded-xl text-sm font-medium hover:bg-slate-800/30 transition-colors">
            Histórico
          </button>
        </div>
      </motion.div>

      {/* Active Draws */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Sorteios Ativos</h3>
          <button className="text-appBlue text-sm font-medium">Ver todos</button>
        </div>

        <div className="space-y-3">
          {activeDraws.map((draw, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-100 rounded-2xl p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{draw.name}</h4>
                  <p className="text-sm text-gray-600">{draw.prize}</p>
                </div>
                <span className="text-xs bg-appYellow/20 text-gray-700 px-2 py-1 rounded-full font-medium">
                  {new Date(draw.date).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {draw.participants}
                  </span>{" "}
                  participantes
                </div>
                <button
                  disabled={userPoints < draw.entryCost}
                  className="bg-appBlue text-white px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {draw.entryCost} pts
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Prêmios</h3>
          <button className="text-appBlue text-sm font-medium">Ver todos</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {prizes.map((prize, index) => (
              <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
                className="bg-slate-100 rounded-2xl p-4"
            >
              <div className={`w-12 h-12 ${prize.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                {prize.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {prize.name}
              </h4>
              <p className="text-appBlue font-bold text-sm mb-2">
                {prize.points.toLocaleString()} pts
              </p>
              
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-appBlue h-2 rounded-full transition-all"
                    style={{ width: `${prize.progress}%` }}
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-600">
                {prize.progress >= 100 ? "Disponível" : `${prize.progress}% completo`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
