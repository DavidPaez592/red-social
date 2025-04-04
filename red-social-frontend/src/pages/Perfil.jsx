import { Card, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useUserStore from "../store/user";

const { Title, Text } = Typography;

export default function Perfil() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text type="danger">No estás logueado</Text>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 350,
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Avatar del usuario */}
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1890ff", marginBottom: 15 }}
        />

        {/* Información del usuario */}
        <Title level={3} style={{ marginBottom: 5 }}>
          {user.name}
        </Title>
        <Text type="secondary">@{user.name.toLowerCase().replace(/\s+/g, "_")}</Text>

        <div style={{ marginTop: 20 }}>
          <Text strong>Email: </Text>
          <Text>{user.email}</Text>
        </div>
      </Card>
    </div>
  );
}
