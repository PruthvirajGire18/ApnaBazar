import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import FlashDeals from '../components/FlashDeals'
import TrendingProducts from '../components/TrendingProducts'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Login from '../components/Login'

const Home = () => {
  return (
    <div>
        <MainBanner/>
        <Categories/>
        <FlashDeals/>
        <BestSeller/>
        <TrendingProducts/>
        <BottomBanner/>
        <NewsLetter/>
    </div>
  )
}

export default Home