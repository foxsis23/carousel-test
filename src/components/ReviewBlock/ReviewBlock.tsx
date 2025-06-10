import type {mockReviewsData} from "../../shared/constants/review-cards-data.ts";
import {ReviewCard} from "../ReviewCard/ReviewCard.tsx";
import ArrowIcon from '../../assets/arrow.svg'
import {useEffect, useRef, useState} from "react";

interface ReviewBlockProps {
    cards: typeof mockReviewsData[0][];
}

export const ReviewBlock = ({cards}:ReviewBlockProps) =>{
    const reviewsRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [cardsPerView,setCardsPerView] = useState(3)
    const totalIndicators = Math.ceil(cards.length / cardsPerView)

    const backClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));

        if (reviewsRef.current) {
            reviewsRef.current.scrollBy({
                left: -reviewsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const nextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));

        if (reviewsRef.current) {
            reviewsRef.current.scrollBy({
                left: reviewsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const updateCardsPerView = () => {
        if (window.innerWidth >= 1024) {
            setCardsPerView(3);
        } else if (window.innerWidth >= 900) {
            setCardsPerView(2);
        } else {
            setCardsPerView(1);
        }
    };


    useEffect(() => {
        window.addEventListener('resize', updateCardsPerView);

        let nextClickInterval: number;
        if (window.innerWidth <= 640) {
            nextClickInterval = setInterval(() => {
                nextClick();
            }, 3000);
        }


        return () => {
            window.removeEventListener('resize', updateCardsPerView);
            if (nextClickInterval) clearInterval(nextClickInterval);
        };
    },[])

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-7 items-center justify-center">
                <button
                    className="border border-solid border-gray-300 rounded-full p-5 bg-white text-black items-center justify-center cursor-pointer hover:opacity-70 disabled:opacity-40 sm:flex hidden"
                    onClick={backClick} disabled={currentIndex === 0}
                >
                    <img src={ArrowIcon} alt="arrow" className="size-6" />
                </button>
                <div className="flex flex-row max-w-[300px] sm:max-w-[400px] lg:max-w-[800px] xl:max-w-[1200px] w-full overflow-x-hidden gap-4" ref={reviewsRef}>
                    {cards.map((card) => (
                        <ReviewCard key={card.role} card={card} />
                    ))}
                </div>
                <button
                    className="border border-solid border-gray-300 rounded-full p-5 bg-white text-black items-center justify-center cursor-pointer hover:opacity-70 disabled:opacity-40 sm:flex hidden"
                    onClick={nextClick} disabled={currentIndex + 1 === totalIndicators}
                >
                    <img src={ArrowIcon} alt="arrow" className="size-6 rotate-180" />
                </button>
            </div>
            <div className="flex-row gap-2 mt-5 sm:flex hidden">
                {Array.from({ length: totalIndicators }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    )
}