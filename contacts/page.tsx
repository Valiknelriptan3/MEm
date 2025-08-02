'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Contacts() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [showFakeResponse, setShowFakeResponse] = useState(false);
  const [currentInsult, setCurrentInsult] = useState(0);

  const insults = [
    "Навіщо ви нам пишете?",
    "Ми вас ігноруємо",
    "Спробуйте ще раз. Не допоможе.",
    "Bear-God не схвалює",
    "Ваш запит розглянуто і відхилено"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 250);
    }, Math.random() * 8000 + 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsult(prev => (prev + 1) % insults.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleContactClick = (platform: string) => {
    setShowFakeResponse(true);
    setTimeout(() => setShowFakeResponse(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-purple-900">
      {/* Fake response popup */}
      {showFakeResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-red-900 p-6 rounded-lg border-2 border-red-500 max-w-sm mx-4 animate-bounce">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <p className="text-white font-bold">Автовідповідач:</p>
              <p className="text-red-200 mt-2">{insults[currentInsult]}</p>
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
            <Link href="/buy" className="text-white hover:text-red-500 transition-colors">Купити токен</Link>
            <Link href="/roadmap" className="text-white hover:text-red-500 transition-colors">Roadmap</Link>
            <Link href="/contacts" className="text-red-500">Контакти</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8">
        <h1 className={`text-5xl font-bold text-center mb-4 ${isGlitching ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          Контакти
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Зв'яжіться з нами (хоча ми не відповімо)
        </p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Discord */}
          <div className="bg-purple-900 bg-opacity-50 rounded-lg p-8 border border-purple-500 hover:border-purple-300 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <div className="ri-discord-fill text-2xl text-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Discord</h3>
                <p className="text-purple-300">Наше логово</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Приєднуйтеся до нашого Discord серверу, щоб:
            </p>
            
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Скаржитися на втрачені гроші</li>
              <li>• Ділитися меми про криптопесимізм</li>
              <li>• Чекати відповіді, яка ніколи не прийде</li>
              <li>• Спілкуватися з іншими жертвами $BLGR</li>
            </ul>
            
            <button
              onClick={() => handleContactClick('discord')}
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              discord.gg/cryformemes
            </button>
            
            <p className="text-purple-400 text-sm mt-4 text-center">
              * Сервер може не існувати
            </p>
          </div>

          {/* Email */}
          <div className="bg-red-900 bg-opacity-50 rounded-lg p-8 border border-red-500 hover:border-red-300 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <div className="ri-mail-fill text-2xl text-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Email</h3>
                <p className="text-red-300">Електронна пустота</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Пишіть нам на email, якщо хочете:
            </p>
            
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Отримати автовідповідач</li>
              <li>• Почувати себе ігноровано</li>
              <li>• Втратити ще більше часу</li>
              <li>• Поскаржитися в порожнечу</li>
            </ul>
            
            <button
              onClick={() => handleContactClick('email')}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              noone@bloodger.io
            </button>
            
            <p className="text-red-400 text-sm mt-4 text-center">
              * Поштова скринька переповнена слізьми
            </p>
          </div>
        </div>

        {/* Telegram */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-8 border border-blue-500 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="ri-telegram-fill text-3xl text-white"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Telegram</h3>
            <p className="text-blue-300 text-lg mb-6">"ніколи не відпишемо"</p>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              У нас є Telegram канал, але ми про нього забули пароль. 
              Іноді туди постимо, але частіше просто дивимося на читачів 
              та сміємося з їхньої наївності.
            </p>
            
            <button
              onClick={() => handleContactClick('telegram')}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              @bloodger_official
            </button>
            
            <p className="text-blue-400 text-sm mt-4">
              * Офіційність під питанням
            </p>
          </div>
        </div>

        {/* Contact Form (Fake) */}
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-8 border border-gray-700 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Форма зворотного зв'язку (не працює)
          </h3>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleContactClick('form'); }}>
            <div>
              <label className="block text-gray-300 mb-2">Ваше ім'я (нам все одно)</label>
              <input
                type="text"
                className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                placeholder="Невдаха №..."
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Email (для ігнорування)</label>
              <input
                type="email"
                className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                placeholder="loser@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Повідомлення (в порожнечу)</label>
              <textarea
                rows={4}
                className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
                placeholder="Розкажіть, як ви втратили гроші на наших токенах..."
                maxLength={500}
              />
              <p className="text-gray-500 text-sm mt-1">Максимум 500 символів марних слів</p>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Відправити в нікуди
            </button>
          </form>
          
          <p className="text-gray-500 text-sm text-center mt-4">
            * Форма підключена до /dev/null
          </p>
        </div>

        {/* Social Media (Fake) */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">Соціальні мережі (фейкові)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => handleContactClick('twitter')}
              className="bg-black bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <div className="ri-twitter-x-fill text-3xl text-blue-400 mb-3"></div>
              <p className="text-white font-bold">Twitter</p>
              <p className="text-gray-400 text-sm">@bloodger</p>
            </button>
            
            <button
              onClick={() => handleContactClick('youtube')}
              className="bg-black bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-colors cursor-pointer"
            >
              <div className="ri-youtube-fill text-3xl text-red-400 mb-3"></div>
              <p className="text-white font-bold">YouTube</p>
              <p className="text-gray-400 text-sm">0 підписників</p>
            </button>
            
            <button
              onClick={() => handleContactClick('instagram')}
              className="bg-black bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors cursor-pointer"
            >
              <div className="ri-instagram-fill text-3xl text-pink-400 mb-3"></div>
              <p className="text-white font-bold">Instagram</p>
              <p className="text-gray-400 text-sm">Заблоковано</p>
            </button>
            
            <button
              onClick={() => handleContactClick('tiktok')}
              className="bg-black bg-opacity-50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
            >
              <div className="ri-tiktok-fill text-3xl text-purple-400 mb-3"></div>
              <p className="text-white font-bold">TikTok</p>
              <p className="text-gray-400 text-sm">Кринж-контент</p>
            </button>
          </div>
        </div>

        {/* Office Address (Joke) */}
        <div className="bg-black bg-opacity-60 rounded-lg p-8 border border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Наш офіс</h3>
          
          <div className="mb-6">
            <img
              src="https://readdy.ai/api/search-image?query=dark%20basement%20office%20with%20single%20computer%20setup%2C%20dim%20lighting%2C%20pizza%20boxes%20and%20energy%20drink%20cans%20scattered%20around%2C%20sad%20programmer%20workspace%2C%20dystopian%20atmosphere&width=600&height=400&seq=office-basement&orientation=landscape"
              alt="Our Office"
              className="w-full max-w-md mx-auto rounded-lg border border-gray-600"
            />
          </div>
          
          <div className="text-gray-300 space-y-2">
            <p>📍 <strong>Адреса:</strong> Підвал, квартира 404, вул. Безнадії, 13</p>
            <p>🕒 <strong>Години роботи:</strong> 25/8 (у нашому часовому поясі)</p>
            <p>☎️ <strong>Телефон:</strong> +380 (не існує) 666-13-37</p>
            <p>🚇 <strong>Метро:</strong> Станція "Крах мрій"</p>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            * Офіс може бути віртуальним, як і наші обіцянки
          </p>
        </div>
      </div>
    </div>
  );
}