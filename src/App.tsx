import React, { useState, useEffect } from 'react'
import { NewsList } from './components/NewsList'
import { Newspaper, RefreshCw, Search, X, TrendingUp, Star } from 'lucide-react'

interface NewsItem {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  category: string
  importance: number
  trending: number
}

const mockNews: NewsItem[] = [
  {
    title: "AI Breakthrough: Quantum Neural Networks Achieve Human-Level Reasoning",
    description: "Scientists have developed quantum neural networks that can perform complex reasoning tasks at human-level accuracy, marking a significant milestone in artificial intelligence research.",
    url: "https://example.com/ai-breakthrough",
    image: "https://source.unsplash.com/random/800x600?ai",
    publishedAt: "2050-03-15T09:00:00Z",
    category: "Technology",
    importance: 95,
    trending: 98
  },
  {
    title: "Mars Colony Celebrates 10 Years of Sustainable Living",
    description: "The first permanent Mars colony marks its 10th anniversary, showcasing remarkable advancements in sustainable off-world living and paving the way for further space exploration.",
    url: "https://example.com/mars-colony-anniversary",
    image: "https://source.unsplash.com/random/800x600?mars",
    publishedAt: "2050-03-14T14:30:00Z",
    category: "Space",
    importance: 90,
    trending: 95
  },
  {
    title: "Global Clean Energy Grid Achieves 95% Renewable Power",
    description: "The international clean energy grid now provides 95% of global power from renewable sources, marking a historic achievement in the fight against climate change.",
    url: "https://example.com/clean-energy-milestone",
    image: "https://source.unsplash.com/random/800x600?renewable-energy",
    publishedAt: "2050-03-13T11:45:00Z",
    category: "Environment",
    importance: 92,
    trending: 88
  },
  {
    title: "Nanotechnology Breakthrough Enables Instant Organ Regeneration",
    description: "A revolutionary nanotechnology treatment allows for instant organ regeneration, potentially eliminating organ transplant waiting lists and transforming medical care worldwide.",
    url: "https://example.com/nanotech-organ-regeneration",
    image: "https://source.unsplash.com/random/800x600?medical",
    publishedAt: "2050-03-12T16:20:00Z",
    category: "Health",
    importance: 88,
    trending: 92
  },
  {
    title: "World's First Quantum Internet Goes Live",
    description: "The global quantum internet network has been officially launched, promising unhackable communication and opening new possibilities for distributed quantum computing.",
    url: "https://example.com/quantum-internet-launch",
    image: "https://source.unsplash.com/random/800x600?network",
    publishedAt: "2050-03-11T10:10:00Z",
    category: "Technology",
    importance: 85,
    trending: 90
  },
  {
    title: "Fusion Power Plants Now Supply 30% of Global Energy Needs",
    description: "Fusion power plants have reached a significant milestone, now providing 30% of the world's energy needs, marking a major step towards unlimited, clean energy for all.",
    url: "https://example.com/fusion-power-milestone",
    image: "https://source.unsplash.com/random/800x600?fusion",
    publishedAt: "2050-03-10T13:55:00Z",
    category: "Energy",
    importance: 87,
    trending: 85
  }
]

function App() {
  const [news, setNews] = useState<NewsItem[]>(mockNews)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [sortBy, setSortBy] = useState<'importance' | 'trending'>('importance')

  const refreshNews = () => {
    setNews([...news].sort(() => Math.random() - 0.5))
  }

  const categories = Array.from(new Set(news.map(item => item.category)))

  const filteredNews = news
    .filter(item =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || item.category === selectedCategory)
    )
    .sort((a, b) => b[sortBy] - a[sortBy])

  useEffect(() => {
    const interval = setInterval(refreshNews, 60000) // Refresh news every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Newspaper className="mr-2 text-blue-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">NeoNews 2050</h1>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search news..."
                className={`w-full md:w-64 bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${isSearchFocused ? 'md:w-80' : ''}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && (
                <button
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              onClick={refreshNews}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-300"
            >
              <RefreshCw className="mr-2" size={18} />
              Refresh
            </button>
          </div>
        </div>
      </header>
      <nav className="bg-gray-800 bg-opacity-50 p-4">
        <div className="container mx-auto flex flex-wrap justify-center gap-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
      <main className="container mx-auto mt-8 px-4 pb-8">
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <button
              className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'importance' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSortBy('importance')}
            >
              <Star size={14} className="mr-1" />
              Importance
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm flex items-center ${sortBy === 'trending' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSortBy('trending')}
            >
              <TrendingUp size={14} className="mr-1" />
              Trending
            </button>
          </div>
        </div>
        <NewsList news={filteredNews} />
        {filteredNews.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No news articles found. Try adjusting your search or category filter.</p>
        )}
      </main>
    </div>
  )
}

export default App