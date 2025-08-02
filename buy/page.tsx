'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BuyToken() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRegretVisible, setIsRegretVisible] = useState(false);
  const [tokenPrice, setTokenPrice] = useState(0.000001337);
  const [isGlitching, setIsGlitching] = useState(false);

  // Симуляція падіння ціни
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenPrice(prev => prev * (Math.random() > 0.7 ? 0.95 : 1.05));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Глітч-ефекти
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, Math.random() * 6000 + 4000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    'Підключи гаманець',
    'Купи токен',
    'Сиди й чекай поки ціна впаде',
    'Напиши в Discord: "Чому я це зробив?"'
  ];

  const handleBuyClick = () => {
    setIsRegretVisible(true);
    setTimeout(() => setIsRegretVisible(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-purple-900">
      {/* Regret Modal */}
      {isRegretVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-red-900 p-8 rounded-lg border-2 border-red-500 max-w-md mx-4 animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4">😭</div>
              <h3 className="text-2xl font-bold text-white mb-4">НАДТО ПІЗНО!</h3>
              <p className="text-red-200">
                Ви вже на шляху до фінансової катастрофи. 
                Bear-God схвалює ваш вибір.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-20 p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Pacifico'] text-3xl text-red-500">BLOODGER</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">Головна</Link>
            <Link href="/about" className="text-white hover:text-red-500 transition-colors">Про проєкт</Link>
            <Link href="/nft" className="text-white hover:text-red-500 transition-colors">NFT Галерея</Link>
            <Link href="/buy" className="text-red-500">Купити токен</Link>
            <Link href="/roadmap" className="text-white hover:text-red-500 transition-colors">Roadmap</Link>
            <Link href="/contacts" className="text-white hover:text-red-500 transition-colors">Контакти</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8">
        <h1 className={`text-5xl font-bold text-center mb-4 ${isGlitching ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          Як купити токен і не втратити розум
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Спойлер: розум ви втратите в будь-якому випадку
        </p>

        {/* Token Info */}
        <div className="bg-black bg-opacity-60 rounded-lg p-8 mb-12 border border-red-500">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Токен $BLGR</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Символ:</span>
                  <span className="text-red-400 font-bold">$BLGR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Поточна ціна:</span>
                  <span className="text-green-400 font-bold">${tokenPrice.toFixed(8)} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ринкова кап:</span>
                  <span className="text-red-400 font-bold">$0 (буквально)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Корисність:</span>
                  <span className="text-gray-500">Відсутня</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://readdy.ai/api/search-image?query=cryptocurrency%20token%20coin%20with%20bear%20face%20logo%2C%20red%20and%20black%20colors%2C%20digital%20currency%20design%2C%20blockchain%20aesthetic%2C%20glowing%20effects&width=300&height=300&seq=blgr-token&orientation=squarish"
                alt="BLGR Token"
                className="w-48 h-48 mx-auto rounded-full border-4 border-red-500 animate-spin-slow"
              />
            </div>
          </div>
        </div>

        {/* Contract Address */}
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-6 mb-12 border border-purple-500">
          <h3 className="text-xl font-bold text-white mb-4">Адреса контракту</h3>
          <div className="bg-black p-4 rounded font-mono text-green-400 text-sm break-all">
            0xDEADbEEF1337C0FFEE420BADC0DE666EVIL999
          </div>
          <p className="text-gray-400 text-sm mt-2">
            * Ця адреса може не існувати, але це не наша проблема
          </p>
        </div>

        {/* How to Buy Steps */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Інструкція до самознищення
          </h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-6 rounded-lg border-2 transition-all cursor-pointer ${
                  currentStep > index + 1 ? 'bg-green-900 border-green-500' :
                  currentStep === index + 1 ? 'bg-red-900 border-red-500 animate-pulse' :
                  'bg-gray-800 border-gray-600'
                }`}
                onClick={() => setCurrentStep(index + 1)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep > index + 1 ? 'bg-green-500 text-white' :
                  currentStep === index + 1 ? 'bg-red-500 text-white' :
                  'bg-gray-600 text-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{step}</h3>
                  {index === 0 && (
                    <p className="text-gray-300 mt-2">MetaMask, TrustWallet, або будь-який інший гаманець, який ви згодом ненавидитимете</p>
                  )}
                  {index === 1 && (
                    <p className="text-gray-300 mt-2">Натисніть кнопку нижче і молітеся своїм богам</p>
                  )}
                  {index === 2 && (
                    <p className="text-gray-300 mt-2">Дивіться, як ваші мрії повільно помирають</p>
                  )}
                  {index === 3 && (
                    <p className="text-gray-300 mt-2">Приєднуйтеся до нашої групи підтримки невдах</p>
                  )}
                </div>
                {currentStep > index + 1 && (
                  <div className="text-green-500 text-2xl">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buy Buttons */}
        <div className="text-center space-y-6">
          <button
            onClick={handleBuyClick}
            className="px-12 py-4 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 hover:rotate-1 whitespace-nowrap cursor-pointer border-2 border-red-500 animate-pulse"
          >
            Я вже жалкую
          </button>
          
          <div className="text-gray-400">або</div>
          
          <Link
            href="https://discord.gg/cryformemes"
            target="_blank"
            className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 whitespace-nowrap"
          >
            Йти плакати в Discord
          </Link>
        </div>

        {/* Warnings */}
        <div className="mt-16 space-y-6">
          <div className="bg-yellow-900 bg-opacity-50 border-l-4 border-yellow-500 p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400">ПОПЕРЕДЖЕННЯ</h3>
                <p className="text-yellow-200 mt-2">
                  Покупка $BLGR може призвести до: фінансових втрат, депресії, 
                  екзистенційної кризи, нічних кошмарів про ведмедів та безконечного скролінгу CoinGecko.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-900 bg-opacity-50 border-l-4 border-red-500 p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🚨</div>
              <div>
                <h3 className="text-lg font-bold text-red-400">НЕБЕЗПЕКА</h3>
                <p className="text-red-200 mt-2">
                  Bear-God не несе відповідальності за ваші фінансові рішення. 
                  Він взагалі не несе відповідальності ні за що. Він ведмідь.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-900 bg-opacity-50 border-l-4 border-purple-500 p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🤡</div>
              <div>
                <h3 className="text-lg font-bold text-purple-400">ДИСКЛЕЙМЕР</h3>
                <p className="text-purple-200 mt-2">
                  Це не фінансова порада. Це навіть не порада взагалі. 
                  Це просто слова на екрані, які якимось чином переконали вас витратити гроші.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}