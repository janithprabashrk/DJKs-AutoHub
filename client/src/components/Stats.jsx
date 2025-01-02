import { useState, useEffect } from 'react';
import { Users, MousePointer, Award, Newspaper } from 'lucide-react';
import PropTypes from 'prop-types';

const StatsCard = ({ icon, count, label, suffix = '' }) => {
  return (
    <div className="group flex flex-col items-center rounded-xl bg-gray-800/50 p-6 text-center transition-all duration-300 hover:bg-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="mb-4 rounded-full bg-blue-500/10 p-3 transition-all duration-300 group-hover:bg-blue-500/20">
        {icon}
      </div>
      <h3 className="mb-2 text-4xl font-bold text-white">
        {count}{suffix}
      </h3>
      <p className="text-blue-400">{label}</p>
    </div>
  );
};

// Add prop validation for StatsCard
StatsCard.propTypes = {
  icon: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string
};

const StatCounter = () => {
  const [counts, setCounts] = useState({
    users: 0,
    clicks: 0,
    awards: 0,
    listings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/listing/stats');
        const data = await res.json();
        
        // Animate counting up
        const duration = 2000;
        const steps = 50;
        const interval = duration / steps;

        const timer = setInterval(() => {
          setCounts(prev => ({
            users: prev.users < data.totalUsers ? prev.users + Math.ceil(data.totalUsers/steps) : data.totalUsers,
            clicks: prev.clicks < data.totalViews ? prev.clicks + Math.ceil(data.totalViews/steps) : data.totalViews,
            awards: prev.awards < data.totalModified ? prev.awards + Math.ceil(data.totalModified/steps) : data.totalModified,
            listings: prev.listings < data.totalListings ? prev.listings + Math.ceil(data.totalListings/steps) : data.totalListings
          }));
        }, interval);

        return () => clearInterval(timer);

      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <StatsCard
          icon={<Users className="h-8 w-8 text-blue-400" />}
          count={Math.round(counts.users)}
          label="Total Users"
          suffix="+"
        />
        <StatsCard
          icon={<MousePointer className="h-8 w-8 text-blue-400" />}
          count={Math.round(counts.clicks)}
          label="Total Views"
          suffix="+"
        />
        <StatsCard
          icon={<Award className="h-8 w-8 text-blue-400" />}
          count={Math.round(counts.awards)}
          label="Modified Cars"
          suffix="+"
        />
        <StatsCard
          icon={<Newspaper className="h-8 w-8 text-blue-400" />}
          count={Math.round(counts.listings)}
          label="Total Listings"
          suffix="+"
        />
      </div>
    </div>
  );
};

export default StatCounter;