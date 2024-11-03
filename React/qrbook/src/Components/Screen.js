import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Already from './Already';
import New from './New';
import { Link } from 'react-router-dom';
import Login from './Login'; 
import Button from 'react-bootstrap/Button';

function Screen() {
  const [tabKey, setTabKey] = useState('home'); 
  const [activeData, setActiveData] = useState([]);
  const [login, setLogin] = useState(true);
  useEffect(() => {
    const locStr = localStorage.getItem("key")
    if (locStr !== "Admin") {
      setLogin(false);
    }
    if (tabKey === 'profile') {
      fetchData();
    }
  }, [tabKey]); 

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/data');
      const jsonData = await response.json();
      setActiveData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout =()=>{
    setLogin(false);
    localStorage.removeItem("key");
  }
  return (
    <>
      {login ? (<>
        <Tabs
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}
          transition={true}
          id="noanim-tab-example"
          className="mb-3 m-2"
          style={{ backgroundColor: 'navy', color: 'aliceblue', padding: '5px' }}
        >
          <Tab eventKey="home" title="NEW EMPLOYEE">
            <New />
          </Tab>
          <Tab eventKey="profile" title="OLD EMPLOYEE">
            <Already activeData={activeData} />
          </Tab>
        </Tabs>
        <div className="footer fixed-bottom">
          <div className="d-grid gap-2 m-2">
            <Link to="/Login">
              <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={handleLogout}>
                ADMIN LOGOUT
              </Button>
            </Link>
          </div>
        </div>
      </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Screen;
