import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-[60vh] bg-fixed bg-cover bg-center" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1883&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-3xl lg:text-6xl'>
            Find your next <span className='text-cyan-400'>dream</span>
            <br />
            car with ease
          </h1>
          <div className='text-gray-300 text-xs sm:text-sm'>
            AutoMarket is your premier destination for finding your perfect vehicle.
            <br />
            Browse our extensive collection of quality cars.
          </div>
          <Link
            to={'/search'}
            className='text-xs sm:text-sm text-cyan-400 font-bold hover:underline'
          >
            Let&apos;s get started...
          </Link>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="bg-fixed bg-cover bg-center py-12" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
        <Swiper navigation className="mb-12">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[500px]'
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listing Results Section */}
      <div className="bg-fixed bg-cover bg-center py-10" style={{backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop')`, backgroundAttachment: "fixed", backgroundBlendMode: "normal, overlay"}}>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8'>
          {offerListings && offerListings.length > 0 && (
            <div className='backdrop-blur-lg bg-white/10 p-6 rounded-2xl'>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Special Offers</h2>
                <Link className='text-sm text-cyan-400 hover:underline' to={'/search?offer=true'}>View all offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className='backdrop-blur-lg bg-white/10 p-6 rounded-2xl'>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Cars for Rent</h2>
                <Link className='text-sm text-cyan-400 hover:underline' to={'/search?type=rent'}>View all rentals</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className='backdrop-blur-lg bg-white/10 p-6 rounded-2xl'>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Cars for Sale</h2>
                <Link className='text-sm text-cyan-400 hover:underline' to={'/search?type=sale'}>View all sales</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
