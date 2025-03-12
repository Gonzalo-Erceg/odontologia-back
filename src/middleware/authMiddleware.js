import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const token = req.session.token;
    console.log(token)
    if (!token) return res.status(401).json({ error: "No autenticado" });

    try {
      req.user = jwt.verify(token, process.env.SECRET_JWT);
      next();
    } catch(e) {
      console.log(e)
      res.status(401).json({ error: "Token inválido" });
    }
  };