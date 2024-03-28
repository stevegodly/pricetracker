import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import bgi from '@/public/assets/images/bgi.jpg'

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6  md:px-20 py-24" style={{ backgroundImage:`url(${bgi.src})`}} >
        <div className="flex items-center max-xl:flex-col gap-16">
          <div className="flex flex-col h-2/6 justify-center backdrop-blur-md bg-white/80"> 
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Track Product Prices with 
              <span className="text-primary"> PriceTracker</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
      </section>
    </>
  )
}

export default Home