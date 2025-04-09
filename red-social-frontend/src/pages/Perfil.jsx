import { useState, useEffect } from "react";
import { Card, Typography, Avatar, Button, Input, message, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useUserStore from "../store/user";
import api from "../api/api";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Perfil() {
  const { user, token } = useUserStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const res = await api.get("/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(res.data);
    } catch (err) {
      console.error("Error al obtener tus publicaciones", err);
    }
  };

  useEffect(() => {
    if (token) fetchMyPosts();
  }, [token]);

  const handleCreatePost = async () => {
    if (!content.trim()) return message.warning("El contenido no puede estar vacío");

    setLoading(true);
    try {
      await api.post(
        "/posts",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      message.success("Publicación creada");
      fetchMyPosts(); // refrescar lista de publicaciones
    } catch (error) {
      console.error(error);
      message.error("Error al crear publicación");
    } finally {
      setLoading(false);
    }
  };

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
        padding: 40,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          width: 400,
          margin: "0 auto",
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: 30,
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

      {/* Crear publicación */}
      <Card style={{ width: 400, margin: "0 auto", marginBottom: 20 }}>
        <Title level={4}>Crear publicación</Title>
        <TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué estás pensando?"
          maxLength={280}
        />
        <Button
          type="primary"
          loading={loading}
          onClick={handleCreatePost}
          style={{ marginTop: 10 }}
          block
        >
          Publicar
        </Button>
      </Card>

      {/* Lista de publicaciones propias */}
      <Card
        title="Tus publicaciones"
        style={{ width: 400, margin: "0 auto" }}
        bordered={false}
      >
        <List
          dataSource={myPosts}
          renderItem={(item) => (
            <List.Item>
              <Text>{item.content}</Text>
              <Text type="secondary" style={{ marginLeft: "auto" }}>
                {item.likes} ❤️
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
