import React, { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, Star, TrendingUp } from 'lucide-react'

interface NewsItemProps {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  category: string
  importance: number
  trending: number
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  url,
  image,
  publishedAt,
  category,
  importance,
  trending
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:scale-105">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-full">
          {category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <p className={`text-gray-300 mb-4 ${expanded ? '' : 'line-clamp-2'}`}>{description}</p>
        <button
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Read less' : 'Read more'}
          {expanded ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />}
        </button>
      </div>
      <div className="p-4 bg-gray-900 bg-opacity-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            {new Date(publishedAt).toLocaleDateString()}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            Full article
            <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span className="text-sm text-gray-300">{importance}%</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="text-green-400 mr-1" size={16} />
            <span className="text-sm text-gray-300">{trending}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}