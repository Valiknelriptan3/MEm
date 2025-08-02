
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('legends');
  const [mintProgress, setMintProgress] = useState(65);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [mintCount, setMintCount] = useState(1);
  const [featuredNFT, setFeaturedNFT] = useState(0);
  const [isGalleryMode, setIsGalleryMode] = useState('showcase');
  const [hoveredNFT, setHoveredNFT] = useState<string | null>(null);

  // Hero images rotation - додано ваше нове зображення + 3 додаткових
  const heroImages = [
    'https://static.readdy.ai/image/9ebfd974e686fd57e80602fb344d3a27/9d2c49c95c2527cee507ac565642d354.jfif',
    'https://readdy.ai/api/search-image?query=legendary%20badger%20cyber%20warrior%20with%20holographic%20visor%20and%20neural%20interface%20displaying%20data%20streams%2C%20futuristic%20blue%20and%20purple%20lighting%2C%20high-tech%20armor%20with%20glowing%20circuits%2C%20cyberpunk%20aesthetic&width=500&height=600&seq=hero-cyber-legend&orientation=portrait',
    'https://readdy.ai/api/search-image?query=mystical%20badger%20sage%20with%20flowing%20cosmic%20robes%20and%20glowing%20magical%20orbs%20floating%20around%2C%20starry%20galaxy%20background%2C%20ethereal%20purple%20and%20gold%20energy%20aura%2C%20legendary%20magical%20powers&width=500&height=600&seq=hero-mystic-legend&orientation=portrait',
    'https://readdy.ai/api/search-image?query=legendary%20badger%20emperor%20sitting%20on%20crystal%20throne%20with%20crown%20of%20pure%20light%2C%20divine%20golden%20radiance%2C%20celestial%20palace%20background%2C%20majestic%20and%20powerful%20presence%2C%20royal%20dignity&width=500&height=600&seq=hero-emperor-legend&orientation=portrait',
    'https://readdy.ai/api/search-image?query=ancient%20badger%20guardian%20with%20elemental%20powers%20controlling%20fire%20water%20earth%20air%2C%20legendary%20artifact%20staff%2C%20epic%20fantasy%20background%20with%20swirling%20elements%2C%20mystical%20energy%20effects&width=500&height=600&seq=hero-elemental-legend&orientation=portrait'
  ];

  // Галерея обраних NFT для вітрини - оновлено з новими LEGENDARY NFT
  const showcaseNFTs = [
    {
      id: 'nft-1',
      name: 'Tech Visionary Badger',
      category: 'LEGENDARY',
      price: '18.8 SOL',
      rarity: 'MYTHIC',
      image: 'https://static.readdy.ai/image/9ebfd974e686fd57e80602fb344d3a27/9d2c49c95c2527cee507ac565642d354.jfif',
      description: 'Майбутній візіонер з кіберпанк технологіями та голографічним мозком',
      traits: ['Neural Interface', 'Holographic Brain', 'Cyber Vision', 'Tech Mastery']
    },
    {
      id: 'nft-2',
      name: 'Cosmic Data Oracle',
      category: 'LEGENDARY',
      price: '16.5 SOL',
      rarity: 'MYTHIC',
      image: 'https://readdy.ai/api/search-image?query=legendary%20badger%20cyber%20oracle%20with%20holographic%20visor%20displaying%20cosmic%20data%20streams%20and%20neural%20networks%2C%20futuristic%20blue%20and%20purple%20energy%2C%20digital%20prophecy%20powers%2C%20cyberpunk%20aesthetic&width=400&height=400&seq=data-oracle&orientation=squarish',
      description: 'Оракул цифрових пророцтв, читає майбутнє через дата-потоки',
      traits: ['Data Vision', 'Holographic Interface', 'Cyber Oracle', 'Digital Prophecy']
    },
    {
      id: 'nft-3',
      name: 'Astral Mind Master',
      category: 'LEGENDARY',
      price: '15.2 SOL',
      rarity: 'MYTHIC',
      image: 'https://readdy.ai/api/search-image?query=mystical%20legendary%20badger%20sage%20with%20glowing%20third%20eye%20and%20ethereal%20cosmic%20mind%20projection%2C%20purple%20and%20gold%20magical%20aura%2C%20floating%20in%20astral%20dimension%2C%20spiritual%20power&width=400&height=400&seq=astral-master&orientation=squarish',
      description: 'Володар астральних сил, контролює свідомість та духовні виміри',
      traits: ['Third Eye', 'Astral Power', 'Mind Control', 'Cosmic Wisdom']
    },
    {
      id: 'nft-4',
      name: 'Crystal Throne Emperor',
      category: 'LEGENDARY',
      price: '20.0 SOL',
      rarity: 'MYTHIC',
      image: 'https://readdy.ai/api/search-image?query=legendary%20badger%20emperor%20on%20crystal%20throne%20with%20crown%20of%20pure%20light%20and%20divine%20golden%20aura%2C%20celestial%20palace%20background%2C%20ultimate%20royal%20power%20and%20majesty&width=400&height=400&seq=crystal-emperor&orientation=squarish',
      description: 'Імператор кристального трону, володар абсолютної влади та світла',
      traits: ['Crystal Throne', 'Light Crown', 'Divine Authority', 'Royal Power']
    },
    {
      id: 'nft-5',
      name: 'Royal Badger King',
      category: 'LEGENDARY',
      price: '12.3 SOL',
      rarity: 'LEGENDARY',
      image: 'https://static.readdy.ai/image/9ebfd974e686fd57e80602fb344d3a27/2b0de5e1abf4a342f9be11f795e149aa.png',
      description: 'Королівський борсук з золотою короною та благородним виглядом',
      traits: ['Royal Crown', 'Noble Suit', 'Golden Chain', 'Regal Authority']
    },
    {
      id: 'nft-6',
      name: 'Cyber Guardian Elite',
      category: 'VANGUARD',
      price: '8.7 SOL',
      rarity: 'LEGENDARY',
      image: 'https://readdy.ai/api/search-image?query=futuristic%20badger%20warrior%20in%20high-tech%20neon%20armor%20with%20energy%20shield%20and%20laser%20weapons%2C%20cyberpunk%20cityscape%20background%2C%20electric%20blue%20and%20cyan%20glowing%20effects&width=400&height=400&seq=cyber-guardian-showcase&orientation=squarish',
      description: 'Захисник цифрової мережі, елітний кібер-воїн',
      traits: ['Tech Armor', 'Energy Shield', 'Laser Weapons', 'Neural Link']
    }
  ];

  const nftCategories = {
    legends: {
      title: 'LEGENDS',
      supply: '15 образів × 333 supply',
      description: 'Найрідкісніші борсуки-божества з неймовірними силами',
      color: 'from-purple-600 to-pink-600',
      examples: [
        {
          name: 'Tech Visionary',
          image: 'https://static.readdy.ai/image/9ebfd974e686fd57e80602fb344d3a27/9d2c49c95c2527cee507ac565642d354.jfif'
        },
        {
          name: 'Cosmic Oracle',
          image: 'https://readdy.ai/api/search-image?query=legendary%20badger%20cyber%20oracle%20with%20holographic%20visor%20and%20data%20streams%2C%20cosmic%20background%20with%20neural%20networks%2C%20purple%20and%20cyan%20colors%2C%20mystical%20tech%20powers&width=300&height=300&seq=legend-oracle&orientation=squarish'
        },
        {
          name: 'Crystal Emperor',
          image: 'https://readdy.ai/api/search-image?query=legendary%20badger%20emperor%20on%20crystal%20throne%20with%20crown%20of%20light%2C%20divine%20golden%20aura%2C%20celestial%20palace%20background%2C%20ultimate%20royal%20majesty&width=300&height=300&seq=legend-emperor&orientation=squarish'
        }
      ]
    },
    vanguard: {
      title: 'VANGUARD',
      supply: '22 образи × 999 supply',
      description: 'Елітні воїни авангарду, що захищають мережу',
      color: 'from-cyan-600 to-blue-600',
      examples: [
        {
          name: 'Cyber Guardian',
          image: 'https://readdy.ai/api/search-image?query=warrior%20badger%20in%20high-tech%20armor%20with%20energy%20shield%20and%20laser%20sword%2C%20futuristic%20battlefield%20background%2C%20cyan%20and%20blue%20color%20scheme%2C%20heroic%20pose&width=300&height=300&seq=vanguard-1&orientation=squarish'
        },
        {
          name: 'Neon Sentinel',
          image: 'https://readdy.ai/api/search-image?query=badger%20sentinel%20with%20glowing%20visor%20and%20tactical%20gear%2C%20standing%20guard%20in%20neon-lit%20cyberpunk%20city%2C%20blue%20and%20teal%20lighting%20effects&width=300&height=300&seq=vanguard-2&orientation=squarish'
        },
        {
          name: 'Storm Trooper',
          image: 'https://readdy.ai/api/search-image?query=badger%20soldier%20with%20electric%20powers%20and%20storm%20armor%2C%20lightning%20effects%20around%20body%2C%20dark%20storm%20clouds%20background%2C%20electric%20blue%20colors&width=300&height=300&seq=vanguard-3&orientation=squarish'
        }
      ]
    },
    core: {
      title: 'CORE',
      supply: '33 образи × 2222 supply',
      description: 'Основа спільноти, хребет децентралізованої мережі',
      color: 'from-green-600 to-emerald-600',
      examples: [
        {
          name: 'Node Keeper',
          image: 'https://readdy.ai/api/search-image?query=technical%20badger%20with%20network%20nodes%20and%20data%20connections%2C%20green%20holographic%20display%2C%20blockchain%20visualization%20background%2C%20emerald%20and%20lime%20colors&width=300&height=300&seq=core-1&orientation=squarish'
        },
        {
          name: 'Code Warrior',
          image: 'https://readdy.ai/api/search-image?query=programmer%20badger%20with%20code%20matrices%20and%20keyboard%20armor%2C%20green%20terminal%20screen%20background%2C%20hacker%20aesthetic%20with%20green%20color%20scheme&width=300&height=300&seq=core-2&orientation=squarish'
        },
        {
          name: 'Chain Builder',
          image: 'https://readdy.ai/api/search-image?query=builder%20badger%20constructing%20blockchain%20with%20digital%20tools%20and%20blocks%2C%20industrial%20cyberpunk%20setting%2C%20green%20and%20gold%20construction%20theme&width=300&height=300&seq=core-3&orientation=squarish'
        }
      ]
    }
  };

  const roadmapSteps = [
    { phase: 'MINT', status: 'completed', description: 'Запуск колекції на Solana' },
    { phase: 'REVEAL', status: 'current', description: 'Розкриття всіх образів NFT' },
    { phase: 'DAO', status: 'upcoming', description: 'Запуск децентралізованого управління' },
    { phase: 'MERCH', status: 'upcoming', description: 'Мерчандайзинг для спільноти' },
    { phase: 'LORE', status: 'upcoming', description: 'Комікси та розширений всесвіт' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featuredInterval = setInterval(() => {
      setFeaturedNFT((prev) => (prev + 1) % showcaseNFTs.length);
    }, 6000);
    return () => clearInterval(featuredInterval);
  }, []);

  const handleMintCountChange = (increment: boolean) => {
    if (increment && mintCount < 10) {
      setMintCount(prev => prev + 1);
    } else if (!increment && mintCount > 1) {
      setMintCount(prev => prev - 1);
    }
  };

  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC': return 'from-purple-500 to-pink-500';
      case 'LEGENDARY': return 'from-yellow-500 to-orange-500';
      case 'EPIC': return 'from-blue-500 to-cyan-500';
      case 'RARE': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const philosophyFeatures = [
    {
      icon: '🎨',
      title: 'Психоделія',
      description: 'Кожен NFT — це подорож в альтернативні реальності'
    },
    {
      icon: '⚡',
      title: 'Glitch Art',
      description: 'Красиві помилки як форма цифрового мистецтва'
    },
    {
      icon: '🤖',
      title: 'DAO Governance',
      description: 'Спільнота керує майбутнім через децентралізоване голосування'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-cyan-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="font-[\\\'Pacifico\\\'] text-3xl text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              BADGER FORCE
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#showcase" className="text-white/80 hover:text-purple-400 transition-colors">Вітрина</a>
              <a href="#about" className="text-white/80 hover:text-purple-400 transition-colors">Про колекцію</a>
              <a href="#categories" className="text-white/80 hover:text-purple-400 transition-colors">Категорії</a>
              <a href="#mint" className="text-white/80 hover:text-purple-400 transition-colors">Mint</a>
              <a href="#roadmap" className="text-white/80 hover:text-purple-400 transition-colors">Roadmap</a>
              <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 transition-colors font-bold">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 leading-none">
              BADGER<br/>
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text">
                FORCE
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Surrealist NFT Resistance<br/>
              <span className="text-purple-400">on Solana</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#mint"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 text-center whitespace-nowrap cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JOIN RESISTANCE
              </motion.a>
              <motion.a
                href="#showcase"
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold text-lg rounded-lg hover:bg-purple-500/20 transition-all text-center whitespace-nowrap cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Gallery
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
              {heroImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Badger Hero ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentHeroImage ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Hero image indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    index === currentHeroImage ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Showcase Gallery Section */}
      <section id="showcase" className="py-20 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Галерея Обраних</h2>
            <p className="text-xl text-gray-300 mb-8">
              Найяскравіші та найрідкісніші борсуки армії опору
            </p>
            
            {/* Gallery Mode Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
                <button
                  onClick={() => setIsGalleryMode('showcase')}
                  className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isGalleryMode === 'showcase' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-600'
                  }`}
                >
                  🎭 Вітрина
                </button>
                <button
                  onClick={() => setIsGalleryMode('featured')}
                  className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isGalleryMode === 'featured' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-cyan-600'
                  }`}
                >
                  ⭐ Обрані
                </button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isGalleryMode === 'showcase' ? (
              <motion.div
                key="showcase"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {showcaseNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    className="group relative bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-400 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -10 }}
                    onHoverStart={() => setHoveredNFT(nft.id)}
                    onHoverEnd={() => setHoveredNFT(null)}
                  >
                    {/* Rarity Badge */}
                    <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(nft.rarity)}`}>
                      {nft.rarity}
                    </div>

                    {/* NFT Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredNFT === nft.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-2">
                            {nft.traits.slice(0, 2).map((trait, idx) => (
                              <span key={idx} className="px-2 py-1 bg-black/60 rounded-full text-xs text-purple-300">
                                {trait}
                              </span>
                            ))}
                            {nft.traits.length > 2 && (
                              <span className="px-2 py-1 bg-black/60 rounded-full text-xs text-purple-300">
                                +{nft.traits.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* NFT Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {nft.name}
                        </h3>
                        <span className="text-purple-400 font-bold text-sm">
                          {nft.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {nft.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                          {nft.price}
                        </div>
                        <motion.button
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all whitespace-nowrap cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>

                    {/* Glitch Effect */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      hoveredNFT === nft.id ? 'opacity-20' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
                    </div>
                  </motion.div>
                ))
              }
              </motion.div>
            ) : (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                {/* Featured NFT Display */}
                <div className="bg-gradient-to-br from-black/60 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/30">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <motion.div
                      key={featuredNFT}
                      className="relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="aspect-square relative overflow-hidden rounded-2xl">
                        <img
                          src={showcaseNFTs[featuredNFT].image}
                          alt={showcaseNFTs[featuredNFT].name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      {/* Floating Rarity Badge */}
                      <motion.div
                        className={`absolute -top-4 -right-4 px-4 py-2 rounded-xl text-sm font-bold ${getRarityColor(showcaseNFTs[featuredNFT].rarity)}`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {showcaseNFTs[featuredNFT].rarity}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      key={`info-${featuredNFT}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-2">
                          {showcaseNFTs[featuredNFT].name}
                        </h3>
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-cyan-400 font-bold">
                            {showcaseNFTs[featuredNFT].category}
                          </span>
                          <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                            {showcaseNFTs[featuredNFT].price}
                          </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {showcaseNFTs[featuredNFT].description}
                        </p>
                      </div>

                      {/* Traits */}
                      <div>
                        <h4 className="text-white font-bold mb-3">Властивості:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {showcaseNFTs[featuredNFT].traits.map((trait, idx) => (
                            <div key={idx} className="bg-black/40 rounded-lg px-3 py-2 text-center">
                              <span className="text-cyan-300 text-sm">{trait}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Mint This NFT
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Featured Navigation Dots */}
                  <div className="flex justify-center space-x-2 mt-8">
                    {showcaseNFTs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setFeaturedNFT(index)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          index === featuredNFT ? 'bg-cyan-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* About Collection Section */}
      <section id="about" className="py-20 bg-black/40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Філософія Опору</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                BADGER FORCE — це не просто NFT колекція. Це маніфест цифрового опору, 
                де кожен борсук втілює дух сюрреалізму, психоделії та технологічного безумства. 
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Наша децентралізована армія борсуків готова змінити уявлення про мистецтво, 
                спільноту та майбутнє блокчейну. Glitch-ефекти, AI-генеровані образи та 
                колективне управління через DAO — це лише початок революції.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Categories Section */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Категорії NFT</h2>
            <p className="text-xl text-gray-300">
              Три рівні опору, кожен з унікальною місією
            </p>
          </motion.div>

          {/* Category Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
              {Object.entries(nftCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === key
                      ? `bg-gradient-to-r ${category.color} text-white`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Display */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30"
          >
            <div className="text-center mb-12">
              <h3 className={`text-4xl font-bold text-transparent bg-gradient-to-r ${nftCategories[activeCategory as keyof typeof nftCategories].color} bg-clip-text mb-4`}>
                {nftCategories[activeCategory as keyof typeof nftCategories].title}
              </h3>
              <p className="text-lg text-purple-300 mb-2">
                {nftCategories[activeCategory as keyof typeof nftCategories].supply}
              </p>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {nftCategories[activeCategory as keyof typeof nftCategories].description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {nftCategories[activeCategory as keyof typeof nftCategories].examples.map((nft, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-black/40 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{nft.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {activeCategory === 'legends' ? 'Legendary' : 
                       activeCategory === 'vanguard' ? 'Vanguard' : 'Core'} Collection
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mint Section */}
      <section id="mint" className="py-20 bg-black/60">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Mint Your Badger</h2>
            <p className="text-xl text-gray-300">
              Приєднайтесь до армії цифрового опору
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            {/* Mint Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-white mb-2">
                <span>Mint Progress</span>
                <span>{mintProgress}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${mintProgress}%` }}
                  transition={{ duration: 2, delay: 0.5 }}
                ></motion.div>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                6,499 / 10,000 NFTs minted
              </p>
            </div>

            {/* Mint Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Mint Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-white font-bold">0.5 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max per wallet:</span>
                    <span className="text-white font-bold">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Network:</span>
                    <span className="text-purple-400 font-bold">Solana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className="text-green-400 font-bold">Live</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Mint Controls</h3>
                
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMintCountChange(false)}
                      className="w-10 h-10 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-white w-12 text-center">{mintCount}</span>
                    <button
                      onClick={() => handleMintCountChange(true)}
                      className="w-10 h-10 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-300">Total: <span className="text-white font-bold">{(mintCount * 0.5).toFixed(1)} SOL</span></p>
                </div>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="space-y-4">
              {!isWalletConnected ? (
                <motion.button
                  onClick={connectWallet}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect Phantom Wallet
                </motion.button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400 font-bold">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Wallet Connected</span>
                  </div>
                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xl rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Mint {mintCount} Badger{mintCount > 1 ? 's' : ''}
                  </motion.button>
                </div>
              )}
              
              <p className="text-gray-400 text-sm text-center">
                Підтримуються гаманці: Phantom, Solflare, Slope
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Roadmap</h2>
            <p className="text-xl text-gray-300">
              Шлях до повної цифрової революції
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>

            <div className="space-y-16">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1">
                    <div className={`bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'}`}>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.phase}</h3>
                      <p className="text-gray-300">{step.description}</p>
                      <div className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-bold ${
                        step.status === 'completed' ? 'bg-green-600 text-white' :
                        step.status === 'current' ? 'bg-yellow-600 text-black' :
                        'bg-gray-600 text-white'
                      }`}>
                        {step.status === 'completed' ? '✅ Completed' :
                         step.status === 'current' ? '🔄 In Progress' :
                         '📋 Upcoming'}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl bg-black z-10 ${
                    step.status === 'completed' ? 'border-green-500 text-green-500' :
                    step.status === 'current' ? 'border-yellow-500 text-yellow-500' :
                    'border-gray-500 text-gray-500'
                  }`}>
                    {step.status === 'completed' ? '✅' :
                     step.status === 'current' ? '🔄' :
                     '📋'}
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-[\\\'Pacifico\\\'] text-4xl text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-6">
              BADGER FORCE
            </div>
            <p className="text-gray-400 text-lg mb-8">
              Surrealist NFT Resistance on Solana
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-12">
            <motion.a
              href="#"
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="ri-discord-fill text-xl w-6 h-6 flex items-center justify-center"></div>
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="ri-twitter-x-fill text-xl w-6 h-6 flex items-center justify-center"></div>
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="ri-global-line text-xl w-6 h-6 flex items-center justify-center"></div>
            </motion.a>
          </div>

          {/* Footer Info */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-white font-bold mb-4">Contract</h4>
              <p className="text-gray-400 text-sm font-mono break-all">
                7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Supply</h4>
              <p className="text-gray-400">10,000 Unique NFTs</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Network</h4>
              <p className="text-purple-400">Solana Blockchain</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              2024 Badger Force. Powered by Solana. Built for the revolution.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
