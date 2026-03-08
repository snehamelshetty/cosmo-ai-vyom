import StarField from "@/components/StarField";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HealthDashboard from "@/components/HealthDashboard";
import FeaturesSection from "@/components/FeaturesSection";
import MissionPhases from "@/components/MissionPhases";
import RocketSection from "@/components/RocketSection";
import SpaceChallenges from "@/components/SpaceChallenges";
import GalaxyMap from "@/components/GalaxyMap";
import FloatingSpaceElements from "@/components/FloatingSpaceElements";
import FooterSection from "@/components/FooterSection";
import RelaxationMode from "@/components/RelaxationMode";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <FloatingSpaceElements />
      <NavBar />
      <main className="relative z-10">
        <HeroSection />
        <HealthDashboard />
        <FeaturesSection />
        <GalaxyMap />
        <SpaceChallenges />
        <MissionPhases />
        <RocketSection />
        <FooterSection />
      </main>
      <RelaxationMode />
    </div>
  );
};

export default Index;
