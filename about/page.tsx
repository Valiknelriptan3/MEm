'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function About() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [wikiErrors, setWikiErrors] = useState<string[]>([
    'ERROR 404: Logic not found',
    'WARNING: Sanity levels critical',
    'NOTICE: Brain cells deprecated'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, Math.random() * 8000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Глітч overlay */}
      {isGlitching && (
        <div className="fixed inset-0 bg-red-500 opacity-10 animate-ping z-10"></div>
      )}

      {/* Navigation */}
      <nav className="relative z-20 p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Pacifico'] text-3xl text-red-500">BLOODGER</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">Головна</Link>
            <Link href="/about" className="text-red-500">Про проєкт</Link>
            <Link href="/nft" className="text-white hover:text-red-500 transition-colors">NFT Галерея</Link>
            <Link href="/buy" className="text-white hover:text-red-500 transition-colors">Купити токен</Link>
            <Link href="/roadmap" className="text-white hover:text-red-500 transition-colors">Roadmap</Link>
            <Link href="/contacts" className="text-white hover:text-red-500 transition-colors">Контакти</Link>
          </div>
        </div>
      </nav>

      {/* Wiki-style broken page */}
      <div className="relative z-20 max-w-4xl mx-auto p-8">
        {/* Fake Wikipedia header */}
        <div className="bg-gray-800 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">From Bloodgerpedia, the broken encyclopedia</div>
            <div className="text-xs text-red-400 animate-pulse">[CORRUPTED DATA]</div>
          </div>
        </div>

        {/* Error messages */}
        <div className="space-y-2 mb-8">
          {wikiErrors.map((error, index) => (
            <div key={index} className="bg-red-900 bg-opacity-50 text-red-300 p-2 text-sm font-mono border-l-2 border-red-500">
              {error}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-8 border border-gray-700">
          <h1 className={`text-5xl font-bold mb-8 text-center ${isGlitching ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            Нам все одно. Але ви тут.
          </h1>

          <div className="prose prose-invert max-w-none">
            <div className="bg-red-900 bg-opacity-30 border-l-4 border-red-500 p-6 mb-8">
              <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ DISCLAIMER ⚠️</h2>
              <p className="text-gray-300">
                Ця сторінка може викликати: головний біль, екзистенційну кризу, 
                непереборне бажання купити токени, або раптове усвідомлення абсурдності буття.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                Маніфест Божевілля
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-red-400">Bloodger</strong> — це мем, що випадково став токеном. 
                  Ми не планували цього. Ми не контролюємо нічого. Але вже є сайт, тому тримай.
                </p>

                <p>
                  Почалося все з того, що хтось в Discord написав "bloodger" замість "blogger". 
                  Всі сміялися. Потім хтось сказав: "А що якщо зробити з цього токен?". 
                  І ось ми тут.
                </p>

                <p>
                  Наш Bear-God (ведмідь-бог) з'явився уві сні одному з розробників після 
                  передозування енергетиками та перегляду крипто-YouTube. Він сказав: 
                  "Роби токен, або я з'їм твоє портфоліо". Ми послухалися.
                </p>

                <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-300 bg-purple-900 bg-opacity-20 p-4">
                  "Bloodger — це не просто токен. Це стан душі. Стан душі людини, 
                  що втратила всі гроші на мем-койнах, але продовжує купувати."
                  <cite className="block mt-2 text-sm">— Анонімний власник $BLGR</cite>
                </blockquote>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Філософія проєкту</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-red-500">
                  <h3 className="text-xl font-bold text-red-400 mb-4">🧠 Що ми робимо?</h3>
                  <p className="text-gray-300">Абсолютно нічого корисного. І це наша суперсила.</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">💀 Чому існуємо?</h3>
                  <p className="text-gray-300">Бо хтось має показувати абсурдність крипто-світу.</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-green-500">
                  <h3 className="text-xl font-bold text-green-400 mb-4">🎯 Наша мета</h3>
                  <p className="text-gray-300">Зробити так, щоб ви пожалкували про покупку, але продовжували hodl-ити.</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">🤡 Наша цінність</h3>
                  <p className="text-gray-300">Ми чесно кажемо, що нічого не варті. Це рідкість в крипто.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Команда (якщо можна так сказати)</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🐻</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Bear-God (CEO/Dictator)</h3>
                      <p className="text-gray-400 mb-2">Статус: Містичний | Локація: Невідома</p>
                      <p className="text-gray-300">
                        Наш духовний лідер та єдиний, хто розуміє, що відбувається. 
                        Приймає всі важливі рішення через сни команди.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🤖</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Анонім #1 (Розробник-невдаха)</h3>
                      <p className="text-gray-400 mb-2">Статус: Депресія | Місцерозташування: Підвал</p>
                      <p className="text-gray-300">
                        Той, хто написав цей код о 3 ранку під LoFi Hip-Hop та сльози. 
                        Досі не розуміє, як воно працює.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🎨</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Анонім #2 (Художник-абстракціоніст)</h3>
                      <p className="text-gray-400 mb-2">Статус: Творча криза | Локація: Астрал</p>
                      <p className="text-gray-300">
                        Створює NFT, не розуміючи що малює. Вважає, що це мистецтво. 
                        Можливо, він правий.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center mt-16">
              <button className="px-12 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer border-2 border-gray-600 hover:border-red-500">
                Ми нічого не обіцяємо.
              </button>
            </div>
          </div>
        </div>

        {/* Fake wiki footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Остання правка: 32 лютого 2024 о 25:61</p>
          <p>Редактори: Bear-God, Анонім, Ваша мама</p>
          <div className="mt-2 text-xs">
            <span className="text-red-400">ПОПЕРЕДЖЕННЯ:</span> Ця стаття може містити фейкову інформацію, 
            брехню, або правду. Ми самі не знаємо.
          </div>
        </div>
      </div>
    </div>
  );
}