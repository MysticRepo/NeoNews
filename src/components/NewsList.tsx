import React from 'react'
import { NewsItem } from './NewsItem'
import { motion } from 'framer-motion'

interface NewsItemProps {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  category: string
}

interface NewsListProps {
  news: NewsItemProps[]
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <NewsItem {...item} />
        </motion.div>
      ))}
    </div>
  )
}