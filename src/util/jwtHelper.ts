import jwt from "jsonwebtoken";

export const signToken = (userId: string): string => {
    return jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        }
      )
}

export const verifyToken = (accessToken: string) : CustomJwtPayload => {
    return jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
      ) as CustomJwtPayload
}

export interface CustomJwtPayload extends jwt.JwtPayload {
    userId: string;
  }