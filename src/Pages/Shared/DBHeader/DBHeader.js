import React, { useContext } from "react";
import { Dropdown, Form, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../../../media/logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./DBHeader.css";
import { DataContext } from "../../../contexts/DataContext";

const DBHeader = () => {
  const { pMainData, financial_year, setFinancialYear } =
    useContext(DataContext);

  // get user id
  const [id, setId] = React.useState(undefined);
  const token = JSON.parse(sessionStorage.getItem("user"));
  React.useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_BASE_URL}/up/db_user/user/token`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token.access_token },
      })
        .then((response) => response.json())
        .then((data) => setId(data.data.userId));
      // axios.post('${process.env.REACT_APP_BASE_URL}/up/db_user/user/token', { headers: { Authorization: 'Bearer' + ' ' + token.access_token } })
      //     .then(res => {
      //         setId(res?.data?.userId);
      //         // setIsDB(true);
      //     })
    }
  }, [token]);

  // handle data
  const [data, setData] = React.useState([]);
  // console.log(data);
  React.useEffect(() => {
    /*         axios.get("${process.env.REACT_APP_BASE_URL}/up/wchairman", {
                    headers: {
                        'token': token
                    }
                }) */
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/up/db_user/${id}`)
      .then((res) => {
        // console.log(res)
        if (res.data.err) {
          alert(res.data.err);
        } else {
          setData(res?.data);
        }
      });
  }, [id]);

  const containerDB = {
    width: "95vw",
    flexWrap: "inherit",
  };
  const style = {
    height: "35px",
    width: "35px",
  };

  const handleOnClick = (index) => {
    sessionStorage.setItem("dPage", JSON.stringify(index));
    // remove the curly braces
  };

  const handleLogOut = () => {
    // Cookies.remove('userId', { path: '/', domain: '.nilanjona.com.bd' });
    sessionStorage.removeItem("user");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: " #1A1D21", zIndex: 9999 }}
      variant="dark"
      className="text-white text-center nav-mid py-1"
      sticky="top"
    >
      <div
        style={containerDB}
        className="d-flex align-items-center justify-content-between mx-auto"
      >
        <Navbar.Brand href="/home">
          <Image fluid src={logo} alt="logo" style={style} className="me-3" />
          <span className="text-white d-none d-md-inline-block">
            স্থানীয় সরকার বিভাগ
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="mx-auto text-success">
            <p className="fs-4 m-0">{pMainData?.name}</p>
            <p className="m-0">{pMainData?.location}</p>
          </div>
          <div className="me-lg-5">
            {/* <p>২০২০-২১ অর্থবছর</p> */}
            {/* <select name="year" id="id" className="bg-dark text-white"> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setFinancialYear(e.target.value)}
            >
              {financial_year?.map((year, i) => (
                <option value={year.dbName} key={i}>
                  {year.dbName}
                </option>
              ))}
            </Form.Select>
            {/* </select> */}
          </div>
          <Nav>
            <div>
              <p className="m-0">{data?.name}</p>
              <p className="m-0">{data?.designation}</p>
            </div>
            <Dropdown className="ps-4">
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
              >
                <Image
                  fluid
                  style={style}
                  roundedCircle
                  src={data?.image}
                  alt="user"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark" style={{ left: "-60px" }}>
                <Dropdown.Item
                  as={NavLink}
                  to="/home"
                  onClick={() => {
                    handleLogOut();
                    handleOnClick(0);
                  }}
                >
                  লগ আউট
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default DBHeader;

/* 
 <div className="dropdown">
                                        <Nav.Link className="dropbtn"><AiOutlineGlobal className="mx-3" />Website</Nav.Link>
                                        <div className="dropdown-content py-3">
                                            <Nav.Link as={NavLink} className="dropLink" to='wchairman'>চেয়ারম্যান</Nav.Link>
                                            <Nav.Link as={NavLink} className="dropLink" to='wsacib'>সচিব</Nav.Link>
                                            <Nav.Link as={NavLink} className="dropLink" to='wpanel'>প্যানেল চেয়ারম্যান</Nav.Link>
                                            <Nav.Link as={NavLink} className="dropLink" to='wmembar'>মেম্বার</Nav.Link>
                                        </div>
                                    </div>
*/
