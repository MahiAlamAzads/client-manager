import express from "express";
import { Router } from "express";
import { pool } from "../../lib/db";

const apiCategoriesRouter = Router();

interface CategoryPayload {
  name: string;
  discription: string;
}

apiCategoriesRouter.get("/categories", async (req, res) => {
  res.json({ data: await pool.query(``) });
});

apiCategoriesRouter.post("/categories", async (req, res) => {
  const payload: CategoryPayload = req.body;
  if (!payload.name) {
    return res.status(501).send("validation failed");
  }
  const insertCategoryQuery = `
  INSERT INTO categories (
    name,
    description
  ) VALUES (
    $1, $2
  )
  RETURNING *;
`;

  const values = [payload.name, payload.discription];
  const { rows } = await pool.query(insertCategoryQuery, values);

  res
    .status(201)
    .json({ message: "Category created", data: payload, rows: rows[0] });
});

export default apiCategoriesRouter;
