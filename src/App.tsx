import React from "react";
import { Route, Routes } from "react-router-dom";
import { Col, Grid, Row } from "rsuite";
import { Sidebar } from "./components/Sidebar";
import { DashboardPage } from "./components/DashboardPage";
import { MovieDetailsPage } from "./components/MovieDetailsPage";
import "rsuite/dist/rsuite.min.css";
import "./App.css";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="movies/:movieId" element={<MovieDetailsPage />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={2}>
            <Sidebar />
          </Col>
          <AppRoutes />
        </Row>
      </Grid>
    </div>
  );
}

export default React.memo(App);
