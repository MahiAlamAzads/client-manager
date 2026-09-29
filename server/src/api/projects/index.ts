import express from "express";
import { Router } from "express";
import { pool } from "../../lib/db";
import { asyncHandler } from "../../utils/asyncHandler";

const apiProjectsRouter = Router();

interface ProjectPayload {
  name: string;
  client: string;
  url: string;
  category: string;
  unitBudget: number;
}

apiProjectsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    // sort starts
    const sortByParam = req.query.sortBy ? String(req.query.sortBy) : null;
    const orderParam = req.query.order ? String(req.query.order) : null;
    // sort ends

    let query = "SELECT * FROM projects";

    const allowedSortedList = ["unitBudget", "name"];
    if (sortByParam && allowedSortedList.includes(sortByParam)) {
      // If the user selected a valid column, use it. Default direction to ASC if not provided.
      const direction = orderParam === "desc" ? "DESC" : "ASC";
      query += ` ORDER BY "${sortByParam}" ${direction}`;
    } else {
      // BETTER WAY FALLBACK: If no sort specified (or invalid), show latest first
      query += ` ORDER BY created_at DESC`;
    }

    // limit
    const limitParam =
      req.query.limit && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 12;

    query += ` LIMIT $1`;
    const typeCheck = await pool.query(
      `SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'projects' 
     AND LOWER(column_name) = LOWER('unitBudget');`,
    );

    console.log("Column Details:", typeCheck.rows);

    const { rows } = await pool.query(`${query}`, [limitParam]);
    res.status(200).json({ success: true, data: rows });
  }),
);

apiProjectsRouter.post("/", async (req, res) => {
  const payload: ProjectPayload = req.body;
  const insertProjectQuery = `
  INSERT INTO projects (
    name,
    client,
    url,
    category,
    "unitBudget"
  ) VALUES (
    $1, $2, $3, $4, $5
  )
  RETURNING *;
`;

  const values = [
    payload.name,
    payload.client,
    payload.url,
    payload.category,
    payload.unitBudget,
  ];

  const { rows } = await pool.query(insertProjectQuery, values);
  res
    .status(201)
    .json({ message: "Project created", data: payload, rows: rows[0] });
});

export default apiProjectsRouter;
