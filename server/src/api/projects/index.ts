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
    const { category, isFavorite, status, search, sortBy, order, limit } =
      req.query;

    let baseQuery = "SELECT * FROM projects";
    const conditions = [];
    const values = [];

    // 1. Category Filter
    if (category) {
      values.push(String(category));
      conditions.push(`category = $${values.length}`);
    }

    // 2. Favorite Filter (handles ?isFavorite=true and ?isFavorite=false)
    if (typeof isFavorite !== "undefined") {
      const isFavBool = String(isFavorite).toLowerCase() === "true";
      values.push(isFavBool);
      conditions.push(`"isFavorite" = $${values.length}`);
    }

    // 3. Status Filter
    if (status) {
      values.push(String(status));
      conditions.push(`status = $${values.length}`);
    }

    // 4. Search Filter (Case-insensitive via ILIKE)
    if (search) {
      values.push(`%${search}%`);
      const searchPlaceholder = `$${values.length}`;
      conditions.push(
        `(name ILIKE ${searchPlaceholder} OR client ILIKE ${searchPlaceholder})`,
      );
    }

    // Attach WHERE clauses if any exist
    if (conditions.length > 0) {
      baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }

    // 5. Sorting (Allowlist prevents SQL injection)
    const allowedSortedList = ["unitBudget", "name"];
    if (sortBy && allowedSortedList.includes(String(sortBy))) {
      const direction = String(order).toLowerCase() === "desc" ? "DESC" : "ASC";
      baseQuery += ` ORDER BY "${sortBy}" ${direction}, created_at DESC`;
    } else {
      baseQuery += ` ORDER BY created_at DESC`;
    }

    // 6. Pagination Limit
    const limitNum = Number(limit) > 0 ? Number(limit) : 12;
    values.push(limitNum);
    baseQuery += ` LIMIT $${values.length}`;

    // Execute query with fully parameterized values
    const { rows } = await pool.query(baseQuery, values);

    res.status(200).json({ success: true, count: rows.length, data: rows });
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
