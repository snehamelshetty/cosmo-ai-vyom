import { ReactNode } from "react";
import StarField from "./StarField";
import NavBar from "./NavBar";
import FloatingSpaceElements from "./FloatingSpaceElements";
import RelaxationMode from "./RelaxationMode";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <FloatingSpaceElements />
      <NavBar />
      <main className="relative z-10 pt-14">
        {children}
      </main>
      <RelaxationMode />
    </div>
  );
};

export default PageLayout;
