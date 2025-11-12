"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

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

  const instantPrizes = [
    { name: "Roda da Sorte", cost: 100, prizeMax: 5000, icon: "🎡", color: "bg-white" },
    { name: "Raspadinha", cost: 50, prizeMax: 1000, icon: "🎫", color: "bg-white" },
    { name: "Keno (instantâneo)", cost: 150, prizeMax: 7500, icon: "🎲", color: "bg-white" },
    { name: "Plinko (tipo The Wall)", cost: 80, prizeMax: 3000, icon: "🟣", color: "bg-white" },
  ];

  useEffect(() => {
    try {
      localStorage.setItem("userPoints", String(userPoints));
    } catch (e) {
      // ignore
    }
  }, [userPoints]);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Top Hero (Poupe & Ganhe) */}
      <div
        className="mb-6 rounded-2xl p-6 shadow-lg"
        style={{ backgroundColor: '#Fcfc30' }}
      >
        <div>
          <h1 className="text-lg font-bold text-black">Poupe &amp; Ganhe</h1>
          <p className="text-sm text-gray-800 mt-1">Título de capitalização (popular) indexado ao IPCA (Índice de Preços ao Consumidor Amplo) + taxa real.</p>

          <div className="flex gap-2 mt-3">
            <button className="text-xs bg-white px-3 py-1 rounded-full text-black">Sorteios semanais</button>
            <button className="text-xs bg-white px-3 py-1 rounded-full text-black">Mensais</button>
          </div>

          <div className="mt-4">
            <button className="w-full bg-black text-white rounded-full px-5 py-3 font-semibold">Abrir meu título</button>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl p-8 mb-8 text-white shadow-lg"
        style={{ backgroundColor: '#465eff' }}
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
      {/* Prizes Grid (Instant wins) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Premiações instantâneas</h3>
          <button className="text-sm bg-slate-100 px-3 py-1 rounded-full">Responsável</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {instantPrizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className={`w-12 h-12 ${prize.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                {prize.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{prize.name}</h4>
              <p className="text-xs text-gray-600 mb-2">Custo: {prize.cost} pts</p>
              <p className="text-xs text-gray-600 mb-3">Prêmio máx: R$ {prize.prizeMax.toLocaleString()}</p>
              <div className="mt-2">
                <button className="w-full bg-appBlue text-white py-2 rounded-xl text-sm font-medium">Entrar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
