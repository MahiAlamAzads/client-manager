import express from "express";
import { Router } from "express";
import { pool } from "../../lib/db";


const apiProjectsRouter = Router();

interface ProjectPayload {
  name: string;
  client: string;
  url: string;
  category: string;
  unitBudget: number;
}

apiProjectsRouter.get("/", async (req, res) => {
  //   const {};
  res.json({ data: await pool.query(`SELECT * FROM projects`) });
});

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
