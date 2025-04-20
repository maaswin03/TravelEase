export default function HeroSection() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1600')",
          filter: "blur(4px)",
        }}
      ></div>
      <div className="absolute inset-0 bg-[#1E3A8A] bg-opacity-60"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Plan Your Dream Trip Today!</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">Secure your booking in just a few clicks.</p>
        </div>
      </div>
    </section>
  )
}

