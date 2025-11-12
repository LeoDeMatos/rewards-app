"use client";

import { useState } from "react";
import RewardsHome from "./RewardsHome";
import RewardsProfile from "./RewardsProfile";

export default function MainApp() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white pb-20">
      {activeTab === 0 && <RewardsHome />}
      {activeTab === 1 && <RewardsProfile />}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 0 ? "text-appBlue" : "text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs font-medium">Início</span>
        </button>

        <button
          onClick={() => setActiveTab(1)}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 1 ? "text-appBlue" : "text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
