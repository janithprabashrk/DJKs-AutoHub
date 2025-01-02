import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [sellerInfo, setSellerInfo] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        
        // Updated API endpoint
        const sellerRes = await fetch(`/api/listing/user/${data.userRef}`);
        const sellerData = await sellerRes.json();
        setSellerInfo(sellerData);

        // Preload images
        if (data.imageUrls && data.imageUrls.length > 0) {
          const imagePromises = data.imageUrls.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = url;
            });
          });

          Promise.all(imagePromises)
            .then(() => {
              setImagesLoaded(true);
              setLoading(false);
            })
            .catch(err => {
              console.error('Error loading images:', err);
              setError(true);
              setLoading(false);
            });
        } else {
          setImagesLoaded(true);
          setLoading(false);
        }
        
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${listing.modelName} - ${listing.YOM}`,
          text: listing.description,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleEmailClick = () => {
    if (!currentUser) {
      alert('Please sign in to contact the seller');
      return;
    }
    
    if (!sellerInfo) {
      alert('Unable to load seller information. Please try again later.');
      return;
    }
    
    if (!sellerInfo.email) {
      alert('Seller email is not available');
      return;
    }
    
    const subject = encodeURIComponent(`Regarding your vehicle listing: ${listing.modelName} - ${listing.YOM}`);
    const body = encodeURIComponent(`
Hello,

I am interested in your vehicle listing:
${listing.modelName} - ${listing.YOM}
Vehicle Number: ${listing.vehicleNumber}
Price: Rs. ${listing.regularPrice}

Please contact me back regarding this listing.

Best regards,
${currentUser.username}
  `);
    
    const mailtoLink = `mailto:${sellerInfo.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  if (loading || !imagesLoaded) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-900'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-900'>
        <p className='text-red-500'>Something went wrong!</p>
      </div>
    );
  }

  return (
    <main className='bg-[url("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071")] bg-cover bg-center bg-fixed bg-no-repeat bg-black/90 bg-blend-multiply min-h-screen py-28'>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8'>
        <div className='flex justify-between items-center'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
          
          <button
            onClick={handleShare}
            className='flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share
          </button>
        </div>

        {listing && listing.imageUrls && listing.imageUrls.length > 0 && (
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <Swiper
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                renderBullet: function (index, className) {
                  return '<span class="' + className + ' bg-cyan-500"></span>';
                }
              }}
              modules={[Navigation, Pagination, Keyboard]}
              slidesPerView={1}
              className="h-[550px] bg-gray-900 relative group"
            >
              <div className="swiper-button-prev after:content-[''] w-12 h-12 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 absolute top-1/2 left-8 z-10 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-cyan-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </div>
              <div className="swiper-button-next after:content-[''] w-12 h-12 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 absolute top-1/2 right-8 z-10 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-cyan-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 relative overflow-hidden">
                    <img
                      src={url}
                      alt={`Listing image ${index + 1}`}
                      className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                      style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }}
                    />
                    <div 
                      className="absolute inset-0 -z-10"
                      style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px)',
                        opacity: 0.5
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className='flex flex-col gap-4 bg-gray-800/90 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
            {listing.modelName} - {listing.YOM}
          </h1>
          <div>
            <p className='text-gray-300 text-lg leading-relaxed'>
              {showFullDescription ? listing.description : `${listing.description.slice(0, 200)}...`}
            </p>
            <button 
              onClick={() => setShowFullDescription(!showFullDescription)}
              className='text-cyan-400 hover:text-cyan-300 mt-2 font-semibold transition-colors'
            >
              {showFullDescription ? 'Show Less' : 'See More'}
            </button>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 mt-4'>
            <div className='space-y-3'>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Location:</span> {listing.location}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span className='font-semibold text-cyan-400'>Vehicle Number:</span> {listing.vehicleNumber}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
                <span className='font-semibold text-cyan-400'>Make:</span> {listing.Make}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Type:</span> {listing.Type}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Condition:</span> {listing.condition}
              </p>
            </div>
            <div className='space-y-3'>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className='font-semibold text-cyan-400'>Mileage:</span> {listing.Mileage} km
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Fuel Type:</span> {listing.fuelType}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Transmission:</span> {listing.Transmission}
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Color:</span> 
                <div className='flex items-center gap-2'>
                  <span className='w-6 h-6 rounded-full border border-gray-300' style={{backgroundColor: listing.color}}></span>
                  <span>{listing.color}</span>
                </div>
              </p>
              <p className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                <span className='font-semibold text-cyan-400'>Modified:</span> {listing.modified ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className='flex gap-4 items-center mt-6 p-4 bg-gray-900/50 rounded-lg'>
            <p className='text-3xl font-bold text-green-400'>
              Rs. {listing.regularPrice.toLocaleString('en-US')}
            </p>
            {listing.discountPrice > 0 && (
              <p className='text-xl line-through text-red-400 opacity-75'>
                Rs. {listing.discountPrice.toLocaleString('en-US')}
              </p>
            )}
          </div>

          {currentUser && currentUser._id !== listing.userRef && (
            <div className='text-cyan-400 bg-cyan-900/20 p-6 rounded-lg border border-cyan-800 space-y-4'>
              <h3 className='text-xl font-semibold border-b border-cyan-800 pb-3 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                Contact Information
              </h3>
              <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                <p className='font-semibold flex items-center gap-2 bg-cyan-900/30 px-4 py-2 rounded-lg hover:bg-cyan-900/40 transition-colors group'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +94 {listing.contactNumber}
                </p>
                <button 
                  onClick={handleEmailClick}
                  className='flex items-center gap-2 bg-cyan-900/30 px-4 py-2 rounded-lg hover:bg-cyan-900/40 transition-colors group'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email Seller
                </button>
              </div>
            </div>
          )}

          {currentUser && currentUser._id === listing.userRef && (
            <button
              onClick={() => navigate(`/update-listing/${listing._id}`)}
              className='bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg uppercase font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25'
            >
              Edit Listing
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
