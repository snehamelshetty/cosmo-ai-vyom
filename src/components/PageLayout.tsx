import { ReactNode, forwardRef } from "react";
import StarField from "./StarField";
import NavBar from "./NavBar";
import FloatingSpaceElements from "./FloatingSpaceElements";
import RelaxationMode from "./RelaxationMode";

const PageLayout = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="relative min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <FloatingSpaceElements />
      <NavBar />
      <main className="relative z-10 pt-14">
        {children}
      </main>
      <RelaxationMode />
    </div>
  );
});

PageLayout.displayName = "PageLayout";

export default PageLayout;
