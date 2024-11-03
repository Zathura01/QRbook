import React from "react";
import QR from "./QR";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Scan() {
  return (
    <>
      <div className="app-container">
        <QR />
        <div className="footer fixed-bottom">
          <div className="d-grid gap-2 m-2">
            <Link to="/Login">
              <Button variant="primary" size="lg" style={{ width: "100%" }}>
                ADMIN LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scan;
