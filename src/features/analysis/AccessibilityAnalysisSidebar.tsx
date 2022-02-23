import clsx from "clsx";
import Aside from "components/Aside";

const AccessibilityAnalysisSidebar = ({}) => {
  return (
    <Aside className="sticky top-6">
      <Aside.LinkItem href="#friction">Friction Map</Aside.LinkItem>
      <Aside.LinkItem href="#healthFacilities">
        Health Facilities
      </Aside.LinkItem>
      <Aside.LinkItem href="#travelScenario">Travel Scenario</Aside.LinkItem>
      <Aside.LinkItem href="#advancedSettings">
        Advanced Settings
      </Aside.LinkItem>
    </Aside>
  );
};

export default AccessibilityAnalysisSidebar;
