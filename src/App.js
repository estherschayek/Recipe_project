import { Fragment, useEffect } from "react";
import "./App.css";
import Header from "./header";
import Rou from "./routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const message = useSelector((state) => state.user.mess);

  useEffect(() => {
    console.log(message);
    if (user) {
      navigate("/home");
      console.log(message);
    }
    if (message) {
      console.log(message);
      navigate("/singUp");
    }
  }, [user, message]);

  return (
    <Fragment>
      <Header />
      <Rou />
    </Fragment>
  );
}

export default App;
