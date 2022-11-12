import { useLocation, useNavigate } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import { Icon } from "@rsuite/icons";
import { Logo } from "../Logo";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { FaRegBookmark } from "react-icons/fa";
import "./styles.css";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const inactiveColor = "#AFC6FF";
  const onNavigate = (url: string) => {
    navigate(url);
  };
  return (
    <div className="sidebar">
      <Logo />
      <Sidenav defaultOpenKeys={["3", "4"]} className="nav">
        <Sidenav.Body className="nav__container">
          <Nav activeKey="1">
            <Nav.Item
              className={`nav__item ${
                location.pathname === "/" ? "nav__item--active" : null
              }`}
              active={location.pathname === "/"}
              eventKey="1"
              icon={<DashboardIcon color={inactiveColor} />}
              onClick={() => onNavigate("/")}
            />
            <Nav.Item
              className="nav__item"
              disabled
              active={false}
              eventKey="3"
              icon={<Icon as={FaRegBookmark} color={inactiveColor} />}
            />
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
