// src/pages/Login.jsx
import { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import useUserStore from "../store/user";

const { Title } = Typography;

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("/users/login", values);
      setUser(res.data.user, res.data.token);
      message.success("Inicio de sesión exitoso");
      navigate("/perfil");
    } catch (err) {
      message.error("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title={<Title level={3}>Iniciar Sesión</Title>} style={{ width: 350 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            label="Correo"
            rules={[{ required: true, message: "Por favor ingresa tu correo" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
