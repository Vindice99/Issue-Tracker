
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircledIcon, RocketIcon } from "@radix-ui/react-icons";
import LatestIssue from "./LatestIssue";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium">
            <RocketIcon className="w-4 h-4" />
            <span>Track and Manage Your Issues Efficiently</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100 max-w-4xl">
            Modern Issue Tracking Made{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Streamline your workflow with our powerful issue tracker. Create, manage, and resolve issues with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/issues">
              <Button size="lg" className="group">
                View Issues
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/issues/new">
              <Button size="lg" variant="outline">
                Create New Issue
              </Button>
            </Link>
            <LatestIssue/>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fast
              </div>
              <p className="text-gray-600 dark:text-gray-400">Quick issue creation and updates</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple
              </div>
              <p className="text-gray-600 dark:text-gray-400">Clean and intuitive interface</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powerful
              </div>
              <p className="text-gray-600 dark:text-gray-400">Advanced tracking capabilities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <CheckCircledIcon className="w-6 h-6" />,
    title: "Easy Management",
    description: "Create, update, and delete issues with just a few clicks. Simple interface for maximum productivity.",
  },
  {
    icon: <RocketIcon className="w-6 h-6" />,
    title: "Fast Performance",
    description: "Built with Next.js and modern technologies for lightning-fast performance and seamless experience.",
  },
  {
    icon: <CheckCircledIcon className="w-6 h-6" />,
    title: "Status Tracking",
    description: "Track issue status with visual badges. Know exactly what's open, in progress, or closed at a glance.",
  },
];
