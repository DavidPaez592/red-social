// ===========================
// 🔁 TEST: likePost
// ===========================
const { likePost } = require('../controllers/post.controller');

describe('PostController - likePost', () => {
  test('debería incrementar likes si el post existe', async () => {
    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Simula post encontrado
    const mockPost = {
      id: 1,
      likes: 3,
      save: jest.fn().mockResolvedValue(),
    };

    const Post = require('../models/post.model');
    Post.findByPk = jest.fn().mockResolvedValue(mockPost);

    await likePost(req, res);

    expect(Post.findByPk).toHaveBeenCalledWith(1);
    expect(mockPost.likes).toBe(4);
    expect(mockPost.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Like agregado",
      likes: 4
    });
  });

  test('debería retornar 404 si no encuentra el post', async () => {
    const req = { params: { id: 999 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const Post = require('../models/post.model');
    Post.findByPk = jest.fn().mockResolvedValue(null);

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Publicación no encontrada"
    });
  });
});

// ===========================
// 📄 TEST: listPosts (feed)
// ===========================
const { listPosts } = require('../controllers/post.controller');

describe('PostController - listPosts', () => {
  test('debería retornar publicaciones de otros usuarios', async () => {
    const req = { user: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockPosts = [{ id: 2, userId: 2 }, { id: 3, userId: 3 }];

    const Post = require('../models/post.model');
    Post.findAll = jest.fn().mockResolvedValue(mockPosts);

    await listPosts(req, res);

    expect(Post.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });
});

// ===========================
// 👤 TEST: listMyPosts (perfil)
// ===========================
const { listMyPosts } = require('../controllers/post.controller');

describe('PostController - listMyPosts', () => {
  test('debería retornar las publicaciones del usuario autenticado', async () => {
    const req = { user: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const mockMyPosts = [
      { id: 1, userId: 1, content: "Mi primer post" },
      { id: 2, userId: 1, content: "Mi segundo post" }
    ];

    const Post = require('../models/post.model');
    Post.findAll = jest.fn().mockResolvedValue(mockMyPosts);

    await listMyPosts(req, res);

    expect(Post.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: 1 }
    }));
    expect(res.json).toHaveBeenCalledWith(mockMyPosts);
  });
});
