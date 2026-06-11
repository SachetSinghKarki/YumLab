import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }
    const jwtSecret = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ msg: "JWT secret is not configured" });
    }

    jwt.verify(token, jwtSecret, async (err, payload ) => {
        if (err) 
            return res.status(403).json({msg:"Token is not valid"})

        req.userId= payload.id 
        next()
        
    })
}
