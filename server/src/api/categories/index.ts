import express from "express";
import { Router } from "express";
import { pool } from "../../lib/db";
import { asyncHandler } from "../../utils/asyncHandler";

const apiCategoriesRouter = Router();

interface CategoryPayload {
  name: string;
  discription: string;
}

apiCategoriesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM categories");
    res.status(200).json({ success: true, data: rows });
  }),
);

apiCategoriesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
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
  }),
);

apiCategoriesRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { rows, rowCount } = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id],
    );

    if (rowCount === 0) {
      res.status(404).json({
        success: false,
        message: `Category with id ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: rows[0],
    });
  }),
);

export default apiCategoriesRouter;
