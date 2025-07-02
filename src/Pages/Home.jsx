import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  ShoppingCart,
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Cpu,
  CircuitBoard,
  Battery,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "High Quality Components",
      description:
        "Premium electronic components sourced from trusted manufacturers worldwide.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Guarantee",
      description:
        "All products come with warranty and quality assurance for your peace of mind.",
    },
    {
      icon: <Truck className="h-8 w-8 text-purple-600" />,
      title: "Fast Shipping",
      description:
        "Quick delivery across India with secure packaging and tracking.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "Learning Resources",
      description:
        "Comprehensive tutorials and manuals to help you build amazing projects.",
    },
  ];

  const categories = [
    {
      name: "Beginner Kits",
      description: "Perfect for electronics beginners",
      icon: <Battery className="h-12 w-12 text-green-600" />,
      count: "50+ Products",
      color: "bg-green-50 border-green-200",
    },
    {
      name: "Intermediate Kits",
      description: "For developing your skills",
      icon: <CircuitBoard className="h-12 w-12 text-yellow-600" />,
      count: "75+ Products",
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      name: "Advanced Kits",
      description: "Professional grade components",
      icon: <Cpu className="h-12 w-12 text-red-600" />,
      count: "100+ Products",
      color: "bg-red-50 border-red-200",
    },
  ];
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                🚀 New Arrivals Available
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Build Amazing <span className="text-blue-600">Electronics</span>
                <br /> Projects
              </h1>
              <p className="text-xl text-gray-600">
                Discover premium electronic components, learning kits, and
                comprehensive tutorials. From beginner to advanced - we have
                everything you need to bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                  onClick={() => navigate("/product")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Now
                </button>
                <button
                  className="flex items-center justify-center border border-gray-300 px-8 py-3 rounded-lg"
                  onClick={() => navigate("/tutorial")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Electronics"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ElectroShop?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to providing the best electronics components and
              learning experience for makers, students, and professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 p-3 mx-auto bg-gray-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Skill Level
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect components for your expertise level
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border-2 ${cat.color} text-center hover:shadow-xl transition`}
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-semibold mb-1">{cat.name}</h3>
                <p className="text-gray-600 mb-4">{cat.description}</p>
                <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mb-4">
                  {cat.count}
                </span>
                <button
                  className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-lg"
                  onClick={() => navigate("/product")}
                >
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
