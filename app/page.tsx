import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Time Booking</h1>

        <Link href="/book">
  <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition">
    Цаг авах
  </button>
</Link>

      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h2 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Онлайн цаг захиалгын систем
        </h2>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl">
          Үсчин, эмнэлэг, beauty salon зэрэг байгууллагуудад зориулсан
          хялбар booking website.
        </p>

        <Link href="/book">
  <button className="mt-10 bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition">
    Одоо цаг авах
  </button>
</Link>

      </section>

      {/* SERVICES */}
      <section className="px-6 pb-24">
        <h3 className="text-3xl font-bold text-center mb-12">
          Үйлчилгээнүүд
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <h4 className="text-2xl font-bold mb-4">Үс засалт</h4>
            <p className="text-gray-400 mb-6">
              Мэргэжлийн үс засалт болон styling үйлчилгээ.
            </p>

            <p className="text-2xl font-bold">25,000₮</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <h4 className="text-2xl font-bold mb-4">Маникюр</h4>
            <p className="text-gray-400 mb-6">
              Гар болон хумсны бүрэн арчилгаа.
            </p>

            <p className="text-2xl font-bold">35,000₮</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <h4 className="text-2xl font-bold mb-4">Facial</h4>
            <p className="text-gray-400 mb-6">
              Арьс арчилгаа болон facial treatment.
            </p>

            <p className="text-2xl font-bold">50,000₮</p>
          </div>

        </div>
      </section>

      <footer className="border-t border-gray-800 p-6 text-center text-gray-500">
        © 2026 Time Booking. All rights reserved.
      </footer>

    </main>
  )
}