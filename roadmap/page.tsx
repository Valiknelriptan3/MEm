'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Roadmap() {
  const [completedPhases, setCompletedPhases] = useState(3);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, Math.random() * 7000 + 3000);

    return () => clearInterval(interval);
  }, []);

  const roadmapData = [
    {
      quarter: 'Q1 2024',
      title: 'Придумали назву Bloodger',
      status: 'completed',
      description: 'Хтось помилився при написанні "blogger". Ми вирішили, що це знак.',
      achievements: [
        'Зареєстрували домен bloodger.io за $12',
        'Створили логотип в MS Paint за 5 хвилин',
        'Придумали слоган "Купуй мем. Живи мем."'
      ],
      fails: [
        'Забули купити bloodger.com',
        'Втратили оригінальний PSD файл логотипа'
      ]
    },
    {
      quarter: 'Q2 2024',
      title: 'Зробили NFT, бо було нудно',
      status: 'completed',
      description: 'Карантин + Netflix = NFT колекція. Логіка залізна.',
      achievements: [
        'Створили 7 Bear-God NFT за одну ніч',
        'Навчилися користуватися Photoshop (трохи)',
        'Продали 1 NFT маминому другу за 0.01 ETH'
      ],
      fails: [
        'Забули про gas fees',
        'Випадково створили 1000 копій одного NFT',
        'Bear-God виявився схожим на Тедді Бер з IKEA'
      ]
    },
    {
      quarter: 'Q3 2024',
      title: 'Запустили сайт, але він глючить',
      status: 'completed',
      description: 'Наш розробник вивчав React по YouTube туторіалах. Результат очевидний.',
      achievements: [
        'Сайт іноді працює',
        'Навчилися робити анімації (вони жахливі)',
        'Додали звукові ефекти (їх немає, але ви їх чуєте)'
      ],
      fails: [
        'Сайт не працює в Internet Explorer',
        'Мобільна версія — це окремий вид мистецтва',
        'База даних — це просто JSON файл'
      ]
    },
    {
      quarter: 'Q4 2024',
      title: 'DAO, де голоси нічого не вирішують',
      status: 'in-progress',
      description: 'Демократія — це ілюзія. Особливо в крипто.',
      achievements: [
        'Створили токен голосування $VOTE',
        'Провели перше голосування (результати ігноруємо)',
        'Навчилися писати смарт-контракти (які не працюють)'
      ],
      fails: [
        'Bear-God має 51% токенів',
        'Ніхто не розуміє, як працює голосування',
        'Всі рішення все одно приймаємо ми'
      ]
    },
    {
      quarter: 'Q5 2024',
      title: 'IRL подія: збираємось і мовчки дивимось на токен',
      status: 'planned',
      description: 'Орендуємо зал. Поставимо екран з графіком. Будемо мовчати.',
      plannedFeatures: [
        'Оренда залу на 2 години',
        'Великий екран з графіком $BLGR',
        'Безкоштовна кава (якщо принесете свою)',
        'Колективне усвідомлення провалу'
      ],
      risks: [
        'Ніхто не прийде',
        'Всі прийдуть, але токен буде коштувати $0',
        'Bear-God материалізується і з\'їсть всіх'
      ]
    },
    {
      quarter: 'Q6 2025',
      title: 'Метавсесвіт у підвалі',
      status: 'dreaming',
      description: 'Створимо VR досвід, де можна відчути депресію у 360°.',
      wildDreams: [
        'VR чат з Bear-God',
        'Віртуальні NFT галереї',
        'Симулятор втрати грошей',
        'Медитація з токенами'
      ],
      realityCheck: [
        'У нас немає грошей на VR',
        'Наш програміст боїться нових технологій',
        'Підвал не підходить для VR-простору'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-500';
      case 'in-progress': return 'text-yellow-400 border-yellow-500';
      case 'planned': return 'text-blue-400 border-blue-500';
      case 'dreaming': return 'text-purple-400 border-purple-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📋';
      case 'dreaming': return '💭';
      default: return '❓';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено (якось)';
      case 'in-progress': return 'В процесі (можливо)';
      case 'planned': return 'Заплановано (якщо не забудемо)';
      case 'dreaming': return 'Мрії (нереальні)';
      default: return 'Невідомо';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900">
      {/* Glitch effect */}
      {isGlitching && (
        <div className="fixed inset-0 bg-red-500 opacity-10 animate-ping z-10"></div>
      )}

      {/* Navigation */}
      <nav className="relative z-20 p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Pacifico'] text-3xl text-red-500">BLOODGER</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">Головна</Link>
            <Link href="/about" className="text-white hover:text-red-500 transition-colors">Про проєкт</Link>
            <Link href="/nft" className="text-white hover:text-red-500 transition-colors">NFT Галерея</Link>
            <Link href="/buy" className="text-white hover:text-red-500 transition-colors">Купити токен</Link>
            <Link href="/roadmap" className="text-red-500">Roadmap</Link>
            <Link href="/contacts" className="text-white hover:text-red-500 transition-colors">Контакти</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-4 ${isGlitching ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            Roadmap (100% мем)
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Наш шлях від ідеї до повного фіаско
          </p>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto bg-gray-800 rounded-full h-4 mb-8">
            <div 
              className="bg-gradient-to-r from-red-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${(completedPhases / roadmapData.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-400">
            Прогрес: {completedPhases}/{roadmapData.length} етапів втілено у реальність
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-12">
          {roadmapData.map((phase, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < roadmapData.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-red-500 to-purple-500"></div>
              )}

              <div className={`flex items-start space-x-6 ${isGlitching && index === 2 ? 'animate-shake' : ''}`}>
                {/* Timeline dot */}
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl bg-black ${getStatusColor(phase.status)}`}>
                  {getStatusIcon(phase.status)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-black bg-opacity-60 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">{phase.quarter}</div>
                        <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(phase.status)} bg-opacity-20`}>
                          {getStatusText(phase.status)}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 text-lg">{phase.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Achievements/Plans */}
                      {(phase.achievements || phase.plannedFeatures || phase.wildDreams) && (
                        <div>
                          <h4 className="text-lg font-bold text-green-400 mb-3">
                            {phase.achievements ? '✅ Досягнення' : 
                             phase.plannedFeatures ? '📋 Плани' : '💭 Мрії'}
                          </h4>
                          <ul className="space-y-2">
                            {(phase.achievements || phase.plannedFeatures || phase.wildDreams)?.map((item, idx) => (
                              <li key={idx} className="text-gray-300 flex items-start space-x-2">
                                <span className="text-green-400 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Failures/Risks */}
                      {(phase.fails || phase.risks || phase.realityCheck) && (
                        <div>
                          <h4 className="text-lg font-bold text-red-400 mb-3">
                            {phase.fails ? '❌ Проблеми' : 
                             phase.risks ? '⚠️ Ризики' : '🤡 Реальність'}
                          </h4>
                          <ul className="space-y-2">
                            {(phase.fails || phase.risks || phase.realityCheck)?.map((item, idx) => (
                              <li key={idx} className="text-gray-300 flex items-start space-x-2">
                                <span className="text-red-400 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <div className="mt-20 text-center">
          <div className="bg-purple-900 bg-opacity-50 rounded-lg p-8 border border-purple-500">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              Бачення майбутнього (якщо воно взагалі є)
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Колись ми станемо легендою. Легендою про те, як не треба робити криптопроєкти. 
              Але це теж щось, правда?
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg font-bold text-white mb-2">До Місяця</h3>
                <p className="text-gray-400 text-sm">Ну або принаймні до сусіднього будинку</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-lg font-bold text-white mb-2">Diamond Hands</h3>
                <p className="text-gray-400 text-sm">Бо продати все одно нема кому</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🐻</div>
                <h3 className="text-lg font-bold text-white mb-2">Bear-God Forever</h3>
                <p className="text-gray-400 text-sm">Він вічний. Як і наші збитки.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg p-6">
            <p className="text-yellow-200 text-sm">
              <strong>УВАГА:</strong> Цей roadmap є художньою вигадкою. 
              Будь-яка схожість з реальними планами — випадкова. 
              Ми самі не знаємо, що робимо.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}