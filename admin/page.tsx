
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NFT {
  id: string;
  name: string;
  category: 'LEGENDARY' | 'VANGUARD' | 'CORE';
  price: string;
  rarity: 'MYTHIC' | 'LEGENDARY' | 'EPIC' | 'RARE' | 'COMMON';
  image: string;
  description: string;
  traits: string[];
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('nfts');
  const [isAddingNFT, setIsAddingNFT] = useState(false);
  const [editingNFT, setEditingNFT] = useState<NFT | null>(null);

  // Mock NFT data - в реальному застосунку це буде з бази даних
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: 'nft-1',
      name: 'Cosmic Emperor Badger',
      category: 'LEGENDARY',
      price: '15.5 SOL',
      rarity: 'MYTHIC',
      image: 'https://readdy.ai/api/search-image?query=majestic%20badger%20emperor%20with%20golden%20cosmic%20crown%20and%20celestial%20armor%20floating%20in%20space%2C%20purple%20galaxy%20background%2C%20divine%20golden%20aura%2C%20regal%20pose%2C%20hyperrealistic%20digital%20art%20style&width=300&height=300&seq=emperor-admin&orientation=squarish',
      description: 'Володар всесвіту борсуків, керує космічними силами',
      traits: ['Golden Crown', 'Celestial Armor', 'Divine Aura', 'Space Control']
    },
    {
      id: 'nft-2',
      name: 'Void Walker Supreme',
      category: 'LEGENDARY',
      price: '12.3 SOL',
      rarity: 'MYTHIC',
      image: 'https://readdy.ai/api/search-image?query=mystical%20badger%20walking%20through%20dimensional%20portal%20with%20flowing%20ethereal%20robes%20and%20glowing%20staff%2C%20cosmic%20void%20background%20with%20swirling%20galaxies%2C%20purple%20and%20blue%20mystical%20energy&width=300&height=300&seq=voidwalker-admin&orientation=squarish',
      description: 'Мандрівник між вимірами, контролює простір і час',
      traits: ['Dimensional Portal', 'Ethereal Robes', 'Cosmic Staff', 'Void Magic']
    },
    {
      id: 'nft-3',
      name: 'Cyber Guardian Elite',
      category: 'VANGUARD',
      price: '8.7 SOL',
      rarity: 'LEGENDARY',
      image: 'https://readdy.ai/api/search-image?query=futuristic%20badger%20warrior%20in%20high-tech%20neon%20armor%20with%20energy%20shield%20and%20laser%20weapons%2C%20cyberpunk%20cityscape%20background%2C%20electric%20blue%20and%20cyan%20glowing%20effects&width=300&height=300&seq=cyber-guardian-admin&orientation=squarish',
      description: 'Захисник цифрової мережі, елітний кібер-воїн',
      traits: ['Tech Armor', 'Energy Shield', 'Laser Weapons', 'Neural Link']
    }
  ]);

  const [newNFT, setNewNFT] = useState<Partial<NFT>>({
    name: '',
    category: 'CORE',
    price: '',
    rarity: 'COMMON',
    image: '',
    description: '',
    traits: []
  });

  const [newTrait, setNewTrait] = useState('');

  const handleAddTrait = () => {
    if (newTrait && newNFT.traits && !newNFT.traits.includes(newTrait)) {
      setNewNFT({
        ...newNFT,
        traits: [...newNFT.traits, newTrait]
      });
      setNewTrait('');
    }
  };

  const handleRemoveTrait = (trait: string) => {
    if (newNFT.traits) {
      setNewNFT({
        ...newNFT,
        traits: newNFT.traits.filter(t => t !== trait)
      });
    }
  };

  const handleSaveNFT = () => {
    if (newNFT.name && newNFT.price && newNFT.description) {
      const nft: NFT = {
        id: editingNFT?.id || `nft-${Date.now()}`,
        name: newNFT.name,
        category: newNFT.category || 'CORE',
        price: newNFT.price,
        rarity: newNFT.rarity || 'COMMON',
        image: newNFT.image || '',
        description: newNFT.description,
        traits: newNFT.traits || []
      };

      if (editingNFT) {
        setNfts(nfts.map(n => n.id === editingNFT.id ? nft : n));
        setEditingNFT(null);
      } else {
        setNfts([...nfts, nft]);
        setIsAddingNFT(false);
      }

      setNewNFT({
        name: '',
        category: 'CORE',
        price: '',
        rarity: 'COMMON',
        image: '',
        description: '',
        traits: []
      });
    }
  };

  const handleEditNFT = (nft: NFT) => {
    setNewNFT(nft);
    setEditingNFT(nft);
    setIsAddingNFT(true);
  };

  const handleDeleteNFT = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цей NFT?')) {
      setNfts(nfts.filter(nft => nft.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setIsAddingNFT(false);
    setEditingNFT(null);
    setNewNFT({
      name: '',
      category: 'CORE',
      price: '',
      rarity: 'COMMON',
      image: '',
      description: '',
      traits: []
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'LEGENDARY': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'EPIC': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'RARE': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'LEGENDARY': return 'text-purple-400';
      case 'VANGUARD': return 'text-cyan-400';
      case 'CORE': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="font-['Pacifico'] text-3xl text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                BADGER FORCE
              </Link>
              <span className="text-yellow-400 font-bold text-sm bg-yellow-400/20 px-3 py-1 rounded-full">
                ADMIN PANEL
              </span>
            </div>
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Повернутись на сайт
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 flex space-x-2 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('nfts')}
            className={`px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'nfts' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-600'
            }`}
          >
            🖼️ Управління NFT
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-cyan-600'
            }`}
          >
            📊 Аналітика
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'settings' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-600'
            }`}
          >
            ⚙️ Налаштування
          </button>
        </div>

        {activeTab === 'nfts' && (
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Управління NFT</h1>
                <p className="text-gray-400">Всього NFT: {nfts.length}</p>
              </div>
              <motion.button
                onClick={() => setIsAddingNFT(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all whitespace-nowrap cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + Додати NFT
              </motion.button>
            </div>

            {/* Add/Edit NFT Form */}
            {isAddingNFT && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingNFT ? 'Редагувати NFT' : 'Додати новий NFT'}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-bold mb-2">Назва NFT</label>
                      <input
                        type="text"
                        value={newNFT.name || ''}
                        onChange={(e) => setNewNFT({...newNFT, name: e.target.value})}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="Наприклад: Cosmic Emperor"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-bold mb-2">Категорія</label>
                        <select
                          value={newNFT.category || 'CORE'}
                          onChange={(e) => setNewNFT({...newNFT, category: e.target.value as NFT['category']})}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-8"
                        >
                          <option value="LEGENDARY">LEGENDARY</option>
                          <option value="VANGUARD">VANGUARD</option>
                          <option value="CORE">CORE</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-bold mb-2">Рідкість</label>
                        <select
                          value={newNFT.rarity || 'COMMON'}
                          onChange={(e) => setNewNFT({...newNFT, rarity: e.target.value as NFT['rarity']})}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-8"
                        >
                          <option value="MYTHIC">MYTHIC</option>
                          <option value="LEGENDARY">LEGENDARY</option>
                          <option value="EPIC">EPIC</option>
                          <option value="RARE">RARE</option>
                          <option value="COMMON">COMMON</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Ціна</label>
                      <input
                        type="text"
                        value={newNFT.price || ''}
                        onChange={(e) => setNewNFT({...newNFT, price: e.target.value})}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="Наприклад: 5.5 SOL"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">URL зображення</label>
                      <input
                        type="url"
                        value={newNFT.image || ''}
                        onChange={(e) => setNewNFT({...newNFT, image: e.target.value})}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-bold mb-2">Опис</label>
                      <textarea
                        value={newNFT.description || ''}
                        onChange={(e) => setNewNFT({...newNFT, description: e.target.value})}
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
                        placeholder="Опис NFT..."
                      />
                      <p className="text-gray-400 text-sm mt-1">
                        {newNFT.description?.length || 0}/500 символів
                      </p>
                    </div>

                    <div>
                      <label className="block text-white font-bold mb-2">Властивості</label>
                      <div className="flex space-x-2 mb-3">
                        <input
                          type="text"
                          value={newTrait}
                          onChange={(e) => setNewTrait(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTrait()}
                          className="flex-1 px-4 py-2 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                          placeholder="Додати властивість..."
                        />
                        <button
                          onClick={handleAddTrait}
                          className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Додати
                        </button>
                      </div>

                      {newNFT.traits && newNFT.traits.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {newNFT.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-purple-600/20 border border-purple-500 rounded-full text-purple-300 text-sm"
                            >
                              {trait}
                              <button
                                onClick={() => handleRemoveTrait(trait)}
                                className="ml-2 text-purple-400 hover:text-red-400 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Preview */}
                    {newNFT.image && (
                      <div>
                        <label className="block text-white font-bold mb-2">Попередній перегляд</label>
                        <div className="aspect-square w-32 rounded-lg overflow-hidden">
                          <img
                            src={newNFT.image}
                            alt="Preview"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Скасувати
                  </button>
                  <motion.button
                    onClick={handleSaveNFT}
                    disabled={!newNFT.name || !newNFT.price || !newNFT.description}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {editingNFT ? 'Зберегти зміни' : 'Створити NFT'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* NFT List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <motion.div
                  key={nft.id}
                  className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Rarity Badge */}
                  <div className={`absolute top-4 right-4 z-10 px-2 py-1 rounded-full text-xs font-bold text-white ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </div>

                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden">
                    {nft.image ? (
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500">Без зображення</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-lg truncate">{nft.name}</h3>
                      <span className={`text-sm font-bold ${getCategoryColor(nft.category)}`}>
                        {nft.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {nft.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-purple-400 font-bold">{nft.price}</span>
                      <span className="text-gray-400 text-sm">
                        {nft.traits.length} trait{nft.traits.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditNFT(nft)}
                        className="flex-1 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Редагувати
                      </button>
                      <button
                        onClick={() => handleDeleteNFT(nft.id)}
                        className="flex-1 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">Аналітика</h1>
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Всього NFT', value: nfts.length.toString(), color: 'from-purple-600 to-pink-600' },
                { title: 'LEGENDARY', value: nfts.filter(n => n.category === 'LEGENDARY').length.toString(), color: 'from-yellow-600 to-orange-600' },
                { title: 'VANGUARD', value: nfts.filter(n => n.category === 'VANGUARD').length.toString(), color: 'from-cyan-600 to-blue-600' },
                { title: 'CORE', value: nfts.filter(n => n.category === 'CORE').length.toString(), color: 'from-green-600 to-emerald-600' }
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white`}>
                  <h3 className="text-sm font-bold opacity-90 mb-2">{stat.title}</h3>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Rarity Distribution */}
            <div className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Розподіл за рідкістю</h2>
              <div className="space-y-4">
                {['MYTHIC', 'LEGENDARY', 'EPIC', 'RARE', 'COMMON'].map((rarity) => {
                  const count = nfts.filter(n => n.rarity === rarity).length;
                  const percentage = nfts.length > 0 ? (count / nfts.length) * 100 : 0;
                  
                  return (
                    <div key={rarity} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded ${getRarityColor(rarity)}`}></div>
                      <span className="text-white font-bold w-24">{rarity}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${getRarityColor(rarity)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 w-16 text-right">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">Налаштування</h1>
            
            <div className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Загальні налаштування</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-bold mb-2">Назва проєкту</label>
                  <input
                    type="text"
                    defaultValue="BADGER FORCE"
                    className="w-full max-w-md px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">Опис проєкту</label>
                  <textarea
                    defaultValue="Surrealist NFT Resistance on Solana"
                    rows={3}
                    className="w-full max-w-2xl px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">Адреса смарт-контракту</label>
                  <input
                    type="text"
                    defaultValue="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
                    className="w-full max-w-2xl px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-bold mb-2">Ціна mint (SOL)</label>
                    <input
                      type="number"
                      step="0.1"
                      defaultValue="0.5"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Максимум на гаманець</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all whitespace-nowrap cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Зберегти налаштування
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
