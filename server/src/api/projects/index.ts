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
    let query = "SELECT * FROM projects";
    
    const { limit, sortBy } = req.query;

    // if(sortBy)

    // limit at the end of any query
    if (limit && Number(limit) > 0) {
      query += ` LIMIT ${Number(limit)}`;
    }

    const { rows } = await pool.query(`${query}`);
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
