'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NFTGallery() {
  const [activeTab, setActiveTab] = useState('omg-bears');
  const [hoverCard, setHoverCard] = useState<string | null>(null);

  const omgBearsNFTs = [
    {
      id: 1,
      name: 'Bear-God Supreme',
      price: '66.6 ETH',
      backstory: 'Цей NFT судитиме твій гаманець і знайде його жалюгідним. Так само, як і тебе.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20angry%20bear%20god%20with%20golden%20crown%20sitting%20on%20throne%20of%20bones%20and%20crypto%20coins%2C%20dark%20red%20background%2C%208bit%20retro%20game%20style%2C%20glowing%20red%20eyes%2C%20menacing%20expression&width=300&height=300&seq=bear-god-1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Bloody Merchant',
      price: '13.37 ETH',
      backstory: 'Продає душі за токени. Бізнес йде добре, дякую за запитання.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20bear%20merchant%20wearing%20hood%20with%20glowing%20red%20eyes%20holding%20bag%20of%20gold%20coins%2C%20dark%20mysterious%20background%2C%208bit%20style%2C%20sinister%20smile&width=300&height=300&seq=bear-merchant&orientation=squarish'
    },
    {
      id: 3,
      name: 'Chaos Creator',
      price: '4.20 ETH',
      backstory: 'Створює хаос на ринку. Твоє портфоліо — його шедевр.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20chaotic%20bear%20with%20wild%20hair%20surrounded%20by%20burning%20charts%20and%20falling%20money%2C%20acid%20colors%20background%2C%208bit%20retro%20style%2C%20manic%20expression&width=300&height=300&seq=chaos-bear&orientation=squarish'
    },
    {
      id: 4,
      name: 'Diamond Paws',
      price: '2.22 ETH',
      backstory: 'HODL-ить до смерті. Буквально. Його лапи приросли до гаманця.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20bear%20with%20diamond%20hands%20and%20paws%20made%20of%20crystals%2C%20rainbow%20background%2C%208bit%20style%2C%20determined%20expression%2C%20holding%20crypto%20coins&width=300&height=300&seq=diamond-bear&orientation=squarish'
    },
    {
      id: 5,
      name: 'Meme Lord',
      price: '0.69 ETH',
      backstory: 'Контролює всі меми. Твій успіх залежить від його настрою.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20bear%20wearing%20crown%20made%20of%20memes%20and%20internet%20symbols%2C%20colorful%20glitchy%20background%2C%208bit%20retro%20style%2C%20smug%20expression&width=300&height=300&seq=meme-lord-bear&orientation=squarish'
    },
    {
      id: 6,
      name: 'Paper Hands Punisher',
      price: '3.14 ETH',
      backstory: 'Карає тих, хто продає рано. Його погляд перетворює diamond hands у paper.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20intimidating%20bear%20judge%20with%20burning%20red%20eyes%20holding%20scales%20of%20justice%20made%20of%20paper%20money%2C%20dark%20courtroom%20background%2C%208bit%20style&width=300&height=300&seq=punisher-bear&orientation=squarish'
    },
    {
      id: 7,
      name: 'The Void Watcher',
      price: '∞ ETH',
      backstory: 'Дивиться в порожнечу твоєї душі і бачить там... більше порожнечі.',
      image: 'https://readdy.ai/api/search-image?query=pixel%20art%20cosmic%20bear%20floating%20in%20dark%20void%20space%20with%20glowing%20eyes%20and%20ethereal%20aura%2C%20stars%20and%20galaxies%20background%2C%208bit%20mystical%20style&width=300&height=300&seq=void-bear&orientation=squarish'
    }
  ];

  const trashcoreNFTs = [
    {
      id: 1,
      name: 'Існуючий Крик',
      price: '1.11 ETH',
      backstory: 'Це ти, коли дивишся на свій крипто-портфель.',
      image: 'https://readdy.ai/api/search-image?query=abstract%20glitch%20art%20screaming%20face%20made%20of%20corrupted%20pixels%20and%20digital%20noise%2C%20neon%20colors%2C%20cyberpunk%20aesthetic%2C%20distorted%20reality&width=300&height=300&seq=existential-scream&orientation=squarish'
    },
    {
      id: 2,
      name: 'Цифрова Депресія',
      price: '0.42 ETH',
      backstory: 'Коли усвідомлюєш, що твоє життя — це один великий мем.',
      image: 'https://readdy.ai/api/search-image?query=dark%20abstract%20digital%20art%20representing%20depression%20with%20melting%20pixels%20and%20sad%20faces%2C%20blue%20and%20black%20color%20scheme%2C%20glitch%20effects&width=300&height=300&seq=digital-depression&orientation=squarish'
    },
    {
      id: 3,
      name: 'Капіталістичний Кошмар',
      price: '6.66 ETH',
      backstory: 'Гроші їдять твою душу. Смачно.',
      image: 'https://readdy.ai/api/search-image?query=surreal%20collage%20of%20money%20symbols%20eating%20human%20silhouettes%2C%20red%20and%20green%20stock%20market%20colors%2C%20dystopian%20capitalism%20theme%2C%20abstract%20horror&width=300&height=300&seq=capitalist-nightmare&orientation=squarish'
    }
  ];

  const viralTrashNFTs = [
    {
      id: 1,
      name: 'Туалетний Папір Премім',
      price: '100 ETH',
      backstory: 'Дорожчий за золото, безглуздіший за твої інвестиції.',
      image: 'https://readdy.ai/api/search-image?query=golden%20toilet%20paper%20roll%20with%20diamond%20decorations%20on%20pedestal%2C%20luxury%20background%20with%20glitch%20effects%2C%20comic%20sans%20style%20text%20overlay%2C%20meme%20aesthetic&width=300&height=300&seq=premium-toilet-paper&orientation=squarish'
    },
    {
      id: 2,
      name: 'Піксель за Мільйон',
      price: '1000 ETH',
      backstory: 'Один піксель. Мільйон доларів. Нуль сенсу.',
      image: 'https://readdy.ai/api/search-image?query=single%20white%20pixel%20on%20completely%20black%20background%20with%20rainbow%20glitch%20effects%20around%20edges%2C%20minimalist%20art%2C%20expensive%20art%20parody&width=300&height=300&seq=million-pixel&orientation=squarish'
    },
    {
      id: 3,
      name: 'Кіт що Не Існує',
      price: '404 ETH',
      backstory: 'Цього кота немає. Але ти все одно хочеш його купити.',
      image: 'https://readdy.ai/api/search-image?query=invisible%20cat%20outline%20made%20of%20glitch%20effects%20and%20error%20messages%2C%20404%20error%20aesthetic%2C%20transparent%20cat%20silhouette%2C%20digital%20void%20background&width=300&height=300&seq=nonexistent-cat&orientation=squarish'
    }
  ];

  const getCurrentNFTs = () => {
    switch (activeTab) {
      case 'omg-bears': return omgBearsNFTs;
      case 'trashcore': return trashcoreNFTs;
      case 'viral-trash': return viralTrashNFTs;
      default: return omgBearsNFTs;
    }
  };

  const getTabStyle = () => {
    switch (activeTab) {
      case 'omg-bears': return 'bg-red-900 text-white';
      case 'trashcore': return 'bg-purple-900 text-white';  
      case 'viral-trash': return 'bg-green-900 text-white';
      default: return 'bg-red-900 text-white';
    }
  };

  const getBackgroundStyle = () => {
    switch (activeTab) {
      case 'omg-bears': return 'from-red-900 via-black to-red-900';
      case 'trashcore': return 'from-purple-900 via-black to-purple-900';
      case 'viral-trash': return 'from-green-900 via-black to-green-900';
      default: return 'from-red-900 via-black to-red-900';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundStyle()}`}>
      {/* Navigation */}
      <nav className="relative z-20 p-6 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Pacifico'] text-3xl text-red-500">BLOODGER</Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">Головна</Link>
            <Link href="/about" className="text-white hover:text-red-500 transition-colors">Про проєкт</Link>
            <Link href="/nft" className="text-red-500">NFT Галерея</Link>
            <Link href="/buy" className="text-white hover:text-red-500 transition-colors">Купити токен</Link>
            <Link href="/roadmap" className="text-white hover:text-red-500 transition-colors">Roadmap</Link>
            <Link href="/contacts" className="text-white hover:text-red-500 transition-colors">Контакти</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-6xl font-bold text-center text-white mb-4">
          Тріумф Шизофренії
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          NFT колекція, яка змусить вас засумніватися в реальності
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black bg-opacity-50 rounded-lg p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('omg-bears')}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'omg-bears' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-red-600'
              }`}
            >
              🩸 OMG Bears
            </button>
            <button
              onClick={() => setActiveTab('trashcore')}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'trashcore' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-600'
              }`}
            >
              🧠 Trashcore
            </button>
            <button
              onClick={() => setActiveTab('viral-trash')}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'viral-trash' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-600'
              }`}
            >
              🪱 Viral Trash
            </button>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getCurrentNFTs().map((nft) => (
            <div
              key={nft.id}
              className={`bg-black bg-opacity-70 rounded-lg overflow-hidden border-2 transition-all cursor-pointer transform hover:scale-105 ${
                activeTab === 'omg-bears' ? 'border-red-500 hover:border-red-300' :
                activeTab === 'trashcore' ? 'border-purple-500 hover:border-purple-300' :
                'border-green-500 hover:border-green-300'
              } ${activeTab === 'viral-trash' ? 'font-["Comic_Sans_MS"]' : ''}`}
              onMouseEnter={() => setHoverCard(nft.id.toString())}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-64 object-cover object-top"
                />
                {hoverCard === nft.id.toString() && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center animate-pulse">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">👁️</div>
                      <div className="text-white font-bold">СУДЖЕННЯ</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                <div className={`text-2xl font-bold mb-4 ${
                  activeTab === 'omg-bears' ? 'text-red-400' :
                  activeTab === 'trashcore' ? 'text-purple-400' :
                  'text-green-400'
                }`}>
                  {nft.price}
                </div>
                <p className="text-gray-300 text-sm mb-6 italic">
                  "{nft.backstory}"
                </p>
                <button 
                  className={`w-full py-3 font-bold rounded-lg transition-all hover:scale-105 whitespace-nowrap cursor-pointer ${
                    activeTab === 'omg-bears' ? 'bg-red-600 hover:bg-red-700 text-white' :
                    activeTab === 'trashcore' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                    'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  Mint? Може, не треба.
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="mt-16 text-center">
          <div className="bg-yellow-900 bg-opacity-50 border-2 border-yellow-500 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">УВАГА!</h3>
            <p className="text-yellow-200">
              Покупка цих NFT може призвести до: втрати здорового глузду, 
              екзистенційної кризи, банкрутства та усвідомлення того, 
              що гроші — це ілюзія, а ви — жертва капіталізму.
            </p>
            <p className="text-yellow-300 mt-4 text-sm">
              Ми попередили. Тепер ваша совість чиста. Наша — ні.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}