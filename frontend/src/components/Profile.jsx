import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-72 lg:ml-80 px-4 sm:px-8 md:px-10 pt-24 mb-10">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-12 lg:gap-16 sm:ml-10 lg:ml-20 text-center sm:text-left">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover mb-4 sm:mb-0"
            />

            <div>
              {/* USERNAME & BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  adityakr
                </h2>
                <button className="border px-4 py-1 mt-2 sm:mt-0 text-sm rounded-md hover:bg-gray-200 transition">
                  Edit profile
                </button>
              </div>

              {/* STATS */}
              <div className="flex justify-center sm:justify-start gap-8 sm:gap-10 mb-5 mt-3">
                <div className="text-center">
                  <p className="font-semibold text-lg sm:text-[18px]">80</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wider">
                    Following
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg sm:text-[18px]">80</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wider">
                    Followers
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg sm:text-[18px]">80</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 tracking-wider">
                    Posts
                  </p>
                </div>
              </div>

              {/* BIO */}
              <div className="mb-5 text-center sm:text-left">
                <p className="font-semibold text-sm sm:text-base">Aditya Kr</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Digital creator & photographer
                </p>
                <p className="text-gray-500 text-sm sm:text-base">📍 India, Delhi</p>
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div className="flex justify-center border-t border-gray-300 mt-6 sm:mt-8">
            <p className="font-semibold text-black text-lg sm:text-xl mt-5 tracking-tighter">
              My{" "}
              <span className="italic text-blue-500 font-medium">
                WAVES
              </span>
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <img
                key={i}
                src={`https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80${i + 10}`}
                alt={`post-${i}`}
                className="w-full h-60 sm:h-72 md:h-80 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
