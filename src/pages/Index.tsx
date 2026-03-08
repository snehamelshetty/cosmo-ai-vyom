import StarField from "@/components/StarField";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FloatingSpaceElements from "@/components/FloatingSpaceElements";
import FooterSection from "@/components/FooterSection";
import RelaxationMode from "@/components/RelaxationMode";
import HealthDashboard from "@/components/HealthDashboard";
import MissionTimeline from "@/components/MissionTimeline";
import SpaceDataDashboard from "@/components/SpaceDataDashboard";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <FloatingSpaceElements />
      <NavBar />
      <main className="relative z-10">
        <HeroSection />
        <HealthDashboard />
        <SpaceDataDashboard />
        <MissionTimeline />
        <FooterSection />
      </main>
      <RelaxationMode />
    </div>
  );
};

export default Index;
