import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGift, FiX } from "react-icons/fi";

const festivals = [
  {
    month: 0,
    name: "New Year 🎉",
    message: "Wishing you a joyful and prosperous new year!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 1,
    name: "Vasant Panchami 🌼",
    message: "Celebrate the goddess of wisdom and learning — Saraswati Puja!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 3,
    name: "Ram Navami 🕉️",
    message: "Celebrate the birth of Lord Rama — may his blessings be with you!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 4,
    name: "Eid-ul-Fitr 🌙",
    message: "Eid Mubarak! Wishing peace and blessings to all!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 7,
    name: "Happy Independence Day 🇮🇳",
    message: "A bond of love and protection between siblings!",
    img: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-08/15/full/1755223534-7955.png",
  },
  {
    month: 8,
    name: "Happy Ganesh Chaturthi 🐘",
    message: "May Lord Ganesha bless you with wisdom and prosperity!",
    img: "https://www.vibesofindia.com/wp-content/uploads/2023/09/image-45.png",
  },
  {
    month: 9,
    name: "Happy Dussehra & Diwali 🪔",
    des: "from WAVE",
    message: "Victory of light over darkness — celebrate with joy!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 10,
    name: "Guru Nanak Jayanti 🙏",
    message: "Remember the teachings of Guru Nanak Dev Ji!",
    img: "https://www.drikpanchang.com/images/events/diwali/lakshmipuja/diwali_celebration.jpg",
  },
  {
    month: 11,
    name: "Christmas 🎄",
    message: "Wishing you peace, love, and joy this Christmas season!",
    img: "https://images.ctfassets.net/sjxdiqjbm079/1kMBMnl4SNKCMfIRxzxD5B/6e91af244b266e0e34bbb4d2a1fb66f3/Big-Christmas-Energy-1500x500_V2.jpg?f=faces&w=1600&h=900&fm=webp&q=70&fit=fill",
  },
];

export default function Festival() {
  const [festival, setFestival] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const foundFestival = festivals.find((f) => f.month === currentMonth);
    if (foundFestival) setFestival(foundFestival);
  }, []);

  if (!festival) return null;

  return (
    <>
      <button
        onClick={() => setShowSidebar(true)}
        className="fixed bottom-15 sm:bottom-8 right-7  text-white p-2 rounded-full shadow-xl z-50 transition-all duration-300 border-2 border-gray-300 hover:transform-3d hover:scale-105 bg-white"
      >
        <img src="./images/wave.png" alt="" className="w-8 h-8"/>
      </button>

      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-80 bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100 border-l border-orange-200 shadow-lg flex flex-col items-center justify-center text-center p-6 space-y-4 overflow-y-auto z-40"
          >
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute md:bottom-250 lg:bottom-170 bottom-135 right-4 text-orange-700 hover:text-orange-900"
            >
              <FiX size={22} />
            </button>

            <div className="flex flex-col items-center space-y-3 mt-10">
              <h2 className="text-xl font-bold text-orange-700">
                {festival.name}
              </h2>
              {festival.des && (
                <p className="text-sm font-semibold text-orange-700 mb-2">
                  {festival.des}
                </p>
              )}
              <p className="text-sm text-gray-700">{festival.message}</p>
              <img
                src={festival.img}
                alt={festival.name}
                className="rounded-xl shadow-md mt-3 w-48 h-32 object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
