import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { MessageCircle, Users, Image, Heart } from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
    title: "Real-time Chat",
    desc: "Instantly connect with friends and groups in seamless real-time conversations.",
  },
  {
    icon: <Image className="w-6 h-6 text-purple-600" />,
    title: "Media Sharing",
    desc: "Upload photos, videos, and stories that express your moments beautifully.",
  },
  {
    icon: <Users className="w-6 h-6 text-green-600" />,
    title: "Communities",
    desc: "Find and join communities that share your interests and passions.",
  },
  {
    icon: <Heart className="w-6 h-6 text-pink-600" />,
    title: "Likes & Reactions",
    desc: "Engage with others through expressive likes and reactions.",
  },
];

const Features = () => {
  return (
    <div className="py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 mt-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Everything You Need to <span className="text-orange-500">Connect</span>
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
          Discover powerful features designed to bring people closer together, one wave at a time.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {features.map((feat, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-2xl"
          >
            <CardHeader>
              <div className="mb-2">{feat.icon}</div>
              <CardTitle className="text-lg sm:text-xl font-semibold">{feat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-sm sm:text-base">{feat.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Ready to Dive In?</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
          Join the Wave community and start building your network today.
        </p>
        <Button className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium w-full sm:w-auto">
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default Features;
