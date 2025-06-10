import type {mockReviewsData} from "../../shared/constants/review-cards-data.ts";
import doubleQuotesImg from '../../assets/double-quotes.svg'

interface ReviewCardProps {
    card: typeof mockReviewsData[0];
}

export const ReviewCard = ({card}:ReviewCardProps) =>{
    return (
        <div className="p-5 flex flex-col min-w-72 sm:min-w-96 min-h-[500px] border border-solid border-gray-300 rounded-lg bg-white justify-between">
            <div className="flex flex-col gap-5 mt-10">
                <div className="h-[90px] flex flex-col justify-center">
                    <img src={card.companyLogo} alt="company-logo" className="min-[40px] w-fit" />
                </div>
                <p className="text-gray-400 text-xl tracking-wide leading-8 font-medium relative">{card.testimonial}</p>
                <img src={doubleQuotesImg} alt="qoutes" className="size-8 self-end" />
            </div>
            <div className="flex flex-row gap-4">
                <img src={card.clientImg} alt="client-picture" className="size-16" />
                <div className="text-xl">
                    <h5 className="font-bold">{card.name}</h5>
                    <p className="font-normal max-w-[230px]">{card.role}</p>
                </div>
            </div>
        </div>
    )
}