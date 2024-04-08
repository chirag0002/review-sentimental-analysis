import reviewsList from '../data/reviewData.json'
import { MdPersonAddAlt } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import StarRating from './StarRating';
import ReviewHighlighter from './ReviewHighlighter';



const Reviewlist = () => {
    return (
        <div>
            {reviewsList.map((review: any) => (
                <div key={review.review_id} className='my-4 border-2 border-gray-200 p-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex'>
                            <img src={review.source.icon} alt="" className='w-[10%] rounded-full mr-4' />
                            <div className='font-bold'>{review.reviewer_name} <span className='font-normal'>wrote a review at</span> {review.source.name}</div>
                        </div>
                        <div className='flex gap-2 text-xl'>
                            <MdPersonAddAlt />
                            <CiBookmark />
                            <BsThreeDots />
                        </div>
                    </div>
                    <div className='w-11/12 m-auto'>
                        <div className='flex gap-2'>
                            <StarRating rating={review.rating_review_score} />
                            <div className='text-gray-500 text-sm'>{review.date}</div>
                        </div>
                        <div className='mt-3'>
                            <ReviewHighlighter content={review.content} analytics={review.analytics} />
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Reviewlist