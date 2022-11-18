import { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from "src";
import Registration from "src/components/Registration/Registration";
import Authorization from "src/components/Authorization/Authorization";
import Appointments from "src/components/Appointments/Appointments";

const App = () => {
  const store = useContext(Context);
  const [isAuthorization, setIsAuthorization] = useState(store.isAuth);

  useEffect(() => {
    store.checkAuth();
    store.subscribe((isAuthorization) => setIsAuthorization(isAuthorization));
  }, [store]);

  if (isAuthorization) {
    return (
      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route path="*" element={<Navigate to="/appointments" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/authorization" />} />
    </Routes>
  );
};

export default App;
