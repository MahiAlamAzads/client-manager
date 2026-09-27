import { Router } from "express";
import { pool } from "../../lib/db";
import { asyncHandler } from "../../utils/asyncHandler";

const apiCategoriesRouter = Router();

interface CategoryPayload {
  name: string;
  description?: string;
}

// GET all categories
apiCategoriesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query(
      "SELECT * FROM categories ORDER BY id ASC",
    );
    res.status(200).json({ success: true, data: rows });
  }),
);

// POST create category
apiCategoriesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, description }: CategoryPayload = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Validation failed: 'name' is required",
      });
      return;
    }

    const insertCategoryQuery = `
      INSERT INTO categories (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const { rows } = await pool.query(insertCategoryQuery, [
      name.trim(),
      description || null,
    ]);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: rows[0],
    });
  }),
);

// DELETE category by ID
apiCategoriesRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { rows, rowCount } = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *;",
      [id],
    );

    if (!rowCount || rowCount === 0) {
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
