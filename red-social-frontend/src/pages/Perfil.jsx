import { useEffect, useState } from "react";
import { Card, Typography, Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useUserStore from "../store/user";
import api from "../api/api";

const { Title, Text, Paragraph } = Typography;

export default function Perfil() {
  const { user, token } = useUserStore();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await api.get("/posts/my-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyPosts(res.data);
      } catch (error) {
        console.error("Error al obtener tus publicaciones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text type="danger">No estás logueado</Text>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card
        style={{
          width: 350,
          margin: "0 auto",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1890ff", marginBottom: 15 }}
        />
        <Title level={3}>{user.name}</Title>
        <Text type="secondary">@{user.name.toLowerCase().replace(/\s+/g, "_")}</Text>
        <div style={{ marginTop: 20 }}>
          <Text strong>Email: </Text>
          <Text>{user.email}</Text>
        </div>
      </Card>

      <Title level={4} style={{ marginTop: "40px", textAlign: "center" }}>
        Mis publicaciones
      </Title>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: 20 }}>
        {myPosts.map((post) => (
          <Card
            key={post.id}
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Paragraph>{post.content}</Paragraph>
            <Text>{post.likes} Likes</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
