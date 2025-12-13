import express, { Response, Request } from "express";
import { User } from "../../models/User.model";
import { Role } from "../../models/Role.model";
const router = express.Router()

router.get("", async (_: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Role,
        where: { name: "Employee" },
        through: { attributes: [] },
        required: true,
        attributes: []
      }],
      attributes: {
        exclude: ['password']
      }
    })

    if (!users) {
      return res.status(404).json({ error: `No Employee found.` });
    }

    return res.status(200).json({ employees: users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return res.status(500).json({ error: "Internal server error" });
  }
})


export default router

