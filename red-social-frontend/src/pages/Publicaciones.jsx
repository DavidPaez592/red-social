import { useEffect, useState } from "react";
import { Card, Button, Typography, Spin, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import api from "../api/api";
import useUserStore from "../store/user";

const { Title, Paragraph, Text } = Typography;

export default function Publicaciones() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        console.log(res.data); // <-- esto nos muestra como viene el "User"

      } catch (error) {
        console.error("Error al obtener publicaciones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  const handleLike = async (id) => {
    await api.post(`/posts/${id}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await api.get("/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(res.data);
    console.log(res.data);

  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Title style={{ marginBottom: "20px" }}>Publicaciones</Title>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "500px" }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            bordered
            style={{
              width: "100%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "10px",
            }}
            cover={
              <img
                alt="Imagen de la publicación"
                src="https://www.paristouristinformation.fr/es/wp-content/uploads/2021/01/20-of-the-best-Parisian-cafes-in-Paris-in-France.jpg"
                style={{
                  objectFit: "cover",
                  height: "300px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
            }
          >
            {/* Sección superior con avatar y usuario */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Avatar icon={<UserOutlined />} />
              <Text strong>{post.User?.name || "Usuario"}</Text>
            </div>

            {/* Contenido de la publicación */}
            <Paragraph>{post.content}</Paragraph>

            {/* Botón de Like con contador */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Button
                type="text"
                icon={post.likes > 0 ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
                onClick={() => handleLike(post.id)}
              >
                {post.likes} Likes
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
