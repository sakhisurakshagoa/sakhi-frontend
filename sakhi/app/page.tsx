"use client";

// Import only the components needed for Home page
import HeroSection from "./components/Home/HeroSection";
import ComprehensiveSafetyFeatures from "./components/Home/ComprehensiveSafetyFeatures";
import HowSakhiSurakshaWorks from "./components/Home/HowSakhiSurakshaWorks";
import EmergencyCallToAction from "./components/Home/EmergencyCallToAction";
import Testimonials from "./components/Home/Testimonials";
import ForumCTA from "./components/Home/ForumCTA";

export default function Home() {
  return (
    <>
      {/* Home Hero Section */}
      <HeroSection />
<ComprehensiveSafetyFeatures/>
<HowSakhiSurakshaWorks/>
<EmergencyCallToAction/>
<Testimonials/>
<ForumCTA/>
    </>
  );
}
