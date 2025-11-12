"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";

interface Partner {
  id: string;
  name: string;
  icon: string;
  color: string;
  pointsPerTransaction: number;
  description: string;
  isConnected: boolean;
  recentTransactions: Transaction[];
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
}

export default function RewardsPartners() {

  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "ifood",
      name: "iFood",
      icon: "🍔",
      color: "bg-red-500",
      pointsPerTransaction: 10,
      description: "1 ponto a cada real arredondado",
      isConnected: true,
      recentTransactions: [
        { id: "1", date: "Hoje", amount: 89.9 },
        { id: "2", date: "Ontem", amount: 45.5 },
        { id: "3", date: "3 dias atrás", amount: 120.0 },
      ],
    },
    {
      id: "uber",
      name: "Uber",
      icon: "🚗",
      color: "bg-black",
      pointsPerTransaction: 5,
      description: "1 ponto a cada real arredondado",
      isConnected: true,
      recentTransactions: [
        { id: "1", date: "Ontem", amount: 32.5 },
        { id: "2", date: "5 dias atrás", amount: 28.0 },
      ],
    },
    {
      id: "99",
      name: "99",
      icon: "/partners/99.svg",
      color: "bg-yellow-400",
      pointsPerTransaction: 5,
      description: "1 ponto a cada real arredondado",
      isConnected: false,
      recentTransactions: [],
    },
    {
      id: "keeta",
      name: "Keeta",
      icon: "🍕",
      color: "bg-orange-500",
      pointsPerTransaction: 15,
      description: "1 ponto a cada real arredondado",
      isConnected: true,
      recentTransactions: [{ id: "1", date: "2 dias atrás", amount: 56.9 }],
    },
    {
      id: "magalu",
      name: "Magalu",
      icon: "🛍️",
      color: "bg-blue-600",
      pointsPerTransaction: 20,
      description: "1 ponto a cada real arredondado",
      isConnected: false,
      recentTransactions: [],
    },
  ]);

  const handleConnect = (partnerId: string) => {
    setPartners(
      partners.map((partner) =>
        partner.id === partnerId
          ? { ...partner, isConnected: true }
          : partner
      )
    );
  };

  const roundToNearest = (amount: number, step: number) => {
    // Rounded amount = original amount + step (preserve cents)
    if (step <= 0) return Number(amount.toFixed(2));
    return Number((amount + step).toFixed(2));
  };

  const computePointsForStep = (_amount: number, step: number) => {
    // Points equal to the step value (1,3,5)
    return Math.max(0, step);
  };

  // Use 1 R$ rule for totals (default earning per transaction)
  const totalPointsFromPartners = partners.reduce((acc, partner) => {
    if (!partner.isConnected) return acc;
    const partnerPoints = partner.recentTransactions.reduce(
      (sum) => sum + computePointsForStep(0, 1),
      0
    );
    return acc + partnerPoints;
  }, 0);

  const connectedCount = partners.filter((p) => p.isConnected).length;

  const formatMoney = (v: number) => {
    return v.toFixed(2).replace('.', ',');
  };

  const [showSheet, setShowSheet] = useState(false);

  // Choose a random step (1,3,5) for each transaction and keep it stable
  // for the session while the component is mounted.
  const txStepMap: Record<string, number> = useMemo(() => {
    const map: Record<string, number> = {};
    partners.forEach((p) => {
      p.recentTransactions.forEach((tx) => {
        const key = `${p.id}-${tx.id}`;
        const choices = [1, 3, 5];
        map[key] = choices[Math.floor(Math.random() * choices.length)];
      });
    });
    return map;
  }, [partners]);

  const isPending = (dateStr: string) => {
    const s = dateStr.toLowerCase();
    return s.includes('hoje') || s.includes('ontem');
  };

  const availablePoints = partners.reduce((acc, partner) => {
    if (!partner.isConnected) return acc;
    return (
      acc +
      partner.recentTransactions.reduce((sum, tx) => {
        if (isPending(tx.date)) return sum;
        return sum + computePointsForStep(0, 1);
      }, 0)
    );
  }, 0);

  const pendingPoints = partners.reduce((acc, partner) => {
    if (!partner.isConnected) return acc;
    return (
      acc +
      partner.recentTransactions.reduce((sum, tx) => {
        if (!isPending(tx.date)) return sum;
        return sum + computePointsForStep(0, 1);
      }, 0)
    );
  }, 0);

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 rounded-2xl p-4 text-gray-900"
        >
          <p className="text-xs opacity-80 mb-1">Parceiros conectados</p>
          <p className="text-2xl font-semibold">{connectedCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-slate-50 rounded-2xl p-4 text-gray-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Disponíveis</p>
              <p className="text-xl font-semibold text-gray-900">{availablePoints}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Pendentes</p>
              <p className="text-xl font-semibold text-green-600">{pendingPoints}</p>
            </div>
          </div>

          <div className="mt-3">
            <button
              onClick={() => setShowSheet(true)}
              className="bg-slate-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              Como funciona
            </button>
          </div>
        </motion.div>
      </div>

          {/* Per-transaction examples will be shown inside each transaction card */}

          {/* Partners Grid */}
          <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Parceiros Disponíveis
        </h2>

        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
                 className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50"
          >
            {/* Partner Header */}
            <div className={`${partner.color} p-4 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {partner.icon && partner.icon.startsWith("/") ? (
                    <img
                      src={partner.icon}
                      alt={partner.name}
                      className="w-10 h-10 rounded-md object-contain bg-white/0"
                    />
                  ) : (
                    <span className="text-3xl">{partner.icon}</span>
                  )}
                  <div>
                    <h3 className="text-lg font-bold">{partner.name}</h3>
                    <p className="text-sm opacity-90">{partner.description}</p>
                  </div>
                </div>
                        {partner.isConnected && (
                          <div className="flex items-center">
                            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          </div>
                        )}
              </div>

              {!partner.isConnected && (
                <button
                  onClick={() => handleConnect(partner.id)}
                  className="w-full bg-slate-50 text-gray-800 font-semibold py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Conectar Agora
                </button>
              )}
            </div>

            {/* Transactions */}
            {partner.isConnected && partner.recentTransactions.length > 0 && (
                   <div className="p-4 bg-slate-100">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">
                  Transações Recentes
                </h4>
                <div className="space-y-3">
                  {partner.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          R$ {formatMoney(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                          <div className="text-xs text-gray-600 mt-2">
                            <div>
                              <strong>{txStepMap[`${partner.id}-${transaction.id}`] ?? 1} R$:</strong>{' '}
                              {formatMoney(
                                roundToNearest(
                                  transaction.amount,
                                  txStepMap[`${partner.id}-${transaction.id}`] ?? 1
                                )
                              )}{' '}
                              (+{computePointsForStep(transaction.amount, txStepMap[`${partner.id}-${transaction.id}`] ?? 1)} pts)
                            </div>
                          </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">+{computePointsForStep(transaction.amount, txStepMap[`${partner.id}-${transaction.id}`] ?? 1)} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

              {partner.isConnected && partner.recentTransactions.length === 0 && (
              <div className="p-6 text-center bg-slate-100">
                <p className="text-gray-500 text-sm">
                  Conectado! Realize uma compra para ganhar pontos.
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6"
      >
        <h3 className="font-bold text-gray-800 mb-4">Como Funciona</h3>
        <div className="space-y-3">
          <div className="flex space-x-3">
            <div className="flex-shrink-0 text-lg">1️⃣</div>
            <p className="text-sm text-gray-700">
              Conecte seus parceiros favoritos
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0 text-lg">2️⃣</div>
            <p className="text-sm text-gray-700">
              Faça compras e ganhe pontos automaticamente
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0 text-lg">3️⃣</div>
            <p className="text-sm text-gray-700">Resgate seus pontos por dinheiro</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom sheet modal */}
      {showSheet && (
        <div className="fixed inset-0 z-40 flex items-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSheet(false)}
          />
          <div className="relative w-full bg-slate-50 rounded-t-2xl p-4 max-h-[70vh] overflow-auto">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Disponibilidade de Pontos</h3>
            <p className="text-sm text-gray-700 mb-3">
              - Pontos Disponíveis: correspondem a transações já confirmadas (ex.: transações antigas).
            </p>
            <p className="text-sm text-gray-700 mb-3">
              - Pontos Pendentes: correspondem a transações recentes (&quot;Hoje&quot; ou &quot;Ontem&quot;). Esses pontos serão liberados assim que a transação for confirmada pelo parceiro (prazo estimado: alguns dias).
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Observação: Esta é uma simulação de disponibilidade. No sistema real o prazo e regras de liberação podem variar por parceiro.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSheet(false)}
                className="px-4 py-2 bg-appBlue text-white rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
