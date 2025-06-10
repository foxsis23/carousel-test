import {ReviewBlock} from "./components/ReviewBlock/ReviewBlock.tsx";
import {mockReviewsData} from "./shared/constants/review-cards-data.ts";


function App() {

  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center w-full bg-[url('assets/background-image.jpg')] bg-no-repeat bg-cover">
        <h1 className="text-5xl font-bold text-center">Voices of Success with Sales Fortuna</h1>
        <ReviewBlock cards={mockReviewsData} />
    </div>
  )
}

export default App
