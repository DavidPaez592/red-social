import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined, LoginOutlined, LikeOutlined } from "@ant-design/icons";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Publicaciones from "./pages/Publicaciones";
import useUserStore from "./store/user";

const { Header, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout(); // Limpia usuario y token
    navigate("/"); // Redirige a login
  };

  const menuItems = [
    user && {
      label: "Perfil",
      key: "/perfil",
      icon: <UserOutlined />,
      onClick: () => navigate("/perfil"),
    },
    user && {
      label: "Publicaciones",
      key: "/publicaciones",
      icon: <LikeOutlined />,
      onClick: () => navigate("/publicaciones"),
    },
    user && {
      label: "Cerrar sesión",
      key: "logout",
      onClick: handleLogout,
    },
  ].filter(Boolean);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Content style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          {user && <Route path="/perfil" element={<Perfil />} />}
          {user && <Route path="/publicaciones" element={<Publicaciones />} />}
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>Red Social ©2025</Footer>
    </Layout>
  );
}

export default App;
