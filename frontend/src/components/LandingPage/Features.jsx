import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
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

const carouselImages = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
];

const Features = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Everything You Need to <span className="text-orange-500">Connect</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Discover powerful features designed to bring people closer together, one wave at a time.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feat, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 rounded-2xl"
          >
            <CardHeader>
              <div className="mb-3">{feat.icon}</div>
              <CardTitle className="text-xl font-semibold">{feat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">{feat.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to Dive In?</h2>
        <p className="text-gray-600 mb-6">
          Join the Wave community and start building your network today.
        </p>
        <Button className="rounded-full px-6 py-2 text-lg font-medium">Join Now</Button>
      </div>
    </div>
  );
};

export default Features;
