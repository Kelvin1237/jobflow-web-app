import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from "../components";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar/>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
