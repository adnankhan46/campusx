import Navbar from '../../components/constants/Navbar'
import BottomBar from '../../components/constants/Bottombar'
import { useGetAllOpportunitiesQuery } from '../../redux/opportunities/opportunity-api';
import { OpportunityCard } from '../../components/ui/OpportunityCard';

function Explore() {

  const { data, error, isLoading } = useGetAllOpportunitiesQuery({ page: 1, limit: 6 }, {
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <div className='overflow-x-hidden flex flex-col items-center h-fit bg-white mb-[120px] font-inter'>
      <Navbar />
      <div className='flex flex-col w-full md:w-1/2'>
        {data?.opportunities?.length > 0 ? (
          data?.opportunities?.map((opportunity) => (
            <OpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
            />
          ))
        ) : (
          <p>No opportunities found</p>
        )}
      </div>

      <BottomBar />
    </div>
  )
}

export default Explore
