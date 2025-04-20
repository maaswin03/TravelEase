import { Star } from "lucide-react"

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "March 15, 2025",
      comment:
        "Amazing experience! The booking process was smooth and the hotel exceeded our expectations. Will definitely book again.",
      destination: "Bali, Indonesia",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4,
      date: "February 28, 2025",
      comment:
        "Great service and beautiful location. The only issue was the airport transfer was slightly delayed, but everything else was perfect.",
      destination: "Phuket, Thailand",
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      date: "January 10, 2025",
      comment:
        "The best travel booking experience I've ever had. The customer service was exceptional and they helped customize our trip perfectly.",
      destination: "Maldives",
    },
  ]

  return (
    <section className="bg-[#F4F6F9] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read authentic reviews from travelers who have experienced our booking service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start mb-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.destination}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-[#FFC107] text-[#FFC107]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm">{review.comment}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <button className="text-[#1E3A8A] text-sm font-medium hover:underline">Helpful</button>
                <button className="text-gray-500 text-sm hover:text-[#1E3A8A]">Share</button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-[#1E3A8A] shadow border border-[#1E3A8A] hover:bg-[#F4F6F9] transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  )
}

