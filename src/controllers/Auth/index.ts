import express, { Request, Response } from "express";
import { User } from "../../models/User.model";
import { Role } from "../../models/Role.model";
import { comparePassword } from "../../lib/hash";
import { removeRefreshToken, signAccessToken, signRefreshToken, storeRefreshToken, verifyRefreshToken } from "../../lib/token";
import { extractRoles } from "../../lib/extract_roles";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string,
    password: string
  }

  const user = await User.findOne({
    where: {
      name: username
    },
    include: {
      model: Role,
      attributes: ['name'],
      through: { attributes: [] }
    },
  })
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  const roles = extractRoles(user.roles)

  const isMatchPw = await comparePassword(password, user?.password)

  if (!isMatchPw) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const access_token = signAccessToken({ username, roles: roles })
  const refresh_token = signRefreshToken({ username, roles: roles })
  storeRefreshToken(refresh_token, res)

  return res.status(200).json({ accessToken: access_token, roles: roles, id: user.id })
})

router.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" })
  }

  try {
    const payload = verifyRefreshToken(refreshToken)

    if (!payload) {
      return res.status(401).json({ error: "Invalid or expired refresh token" })
    }

    removeRefreshToken(res)

    const new_access_token = signAccessToken({ username: payload.username, roles: payload.roles })
    const new_refresh_token = signRefreshToken({ username: payload.username, roles: payload.roles })
    storeRefreshToken(new_refresh_token, res)

    res.json({
      accessToken: new_access_token,
    });

  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
})

router.post("/logout", async (req: Request, res: Response) => {
  const refreshToken = req.cookies
  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh token" })
  }

  try {
    removeRefreshToken(res)
    return res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }

})

export default router
