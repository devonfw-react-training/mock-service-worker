import { Col } from "rsuite";
import { AllEventsView } from "../AllMoviesView";

export const DashboardPage = () => {
  return (
    <>
      <Col xs={24} sm={24} md={24}>
        <AllEventsView />
      </Col>
    </>
  );
};
