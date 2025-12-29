import express, { Response, Request } from "express";
import { User } from "../../models/User.model";
import { Role } from "../../models/Role.model";
import { Transaction } from "../../models/Transaction.model";
import { Statistics } from "../../models/Statistics.model";
import { WhereOptions } from "sequelize";
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

router.get("/:id/statistics", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { period } = req.query;

    const nowPH = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Asia/Manila',
    });

    const [year, month, day] = nowPH.split('-').map(Number);
    let nowDate = new Date(year, month - 1, day);
    let yesterdayDate = new Date(nowDate);
    yesterdayDate.setDate(nowDate.getDate() - 1);

    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });

    const formattedYesterday = formatDate(yesterdayDate);
    const formattedNow = formatDate(nowDate);

    let whereClause: WhereOptions;
    if (period === "previous") {
      whereClause = { date: formattedYesterday };
    } else {
      whereClause = { date: formattedNow };
    }

    const stats = await Statistics.findOne({
      where: {
        user_id: id,
        ...whereClause,
      },
    });


    const transactionCount = await Transaction.count({
      where: { stat_id: stats?.id }
    })

    const payload = {
      ...stats?.dataValues,
      total: transactionCount
    }

    return res.status(200).json({ stats: payload });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/transactions", async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: id }
    })

    if (!transactions) {
      return res.status(404).json({ error: `No Employee found.` });
    }

    return res.status(200).json({ count: transactions.length, transactions: transactions })

  } catch (error) {
    console.error("Error fetching users:", error)
    return res.status(500).json({ error: "Internal server error" });
  }
})

export default router

