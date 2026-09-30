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

    if (category) {
      values.push(String(category));
      conditions.push(`category = $${values.length}`);
    }
    if (typeof isFavorite !== "undefined") {
      const isFavBool = String(isFavorite).toLowerCase() === "true";
      values.push(isFavBool);
      conditions.push(`"isFavorite" = $${values.length}`);
    }
    if (status) {
      values.push(String(status));
      conditions.push(`status = $${values.length}`);
    }
    if (search) {
      values.push(`%${search}%`);
      const searchPlaceholder = `$${values.length}`;
      conditions.push(
        `(name ILIKE ${searchPlaceholder} OR client ILIKE ${searchPlaceholder})`,
      );
    }
    if (conditions.length > 0) {
      baseQuery += ` WHERE ${conditions.join(" AND ")}`;
    }

    const allowedSortedList = ["unitBudget", "name"];
    if (sortBy && allowedSortedList.includes(String(sortBy))) {
      const direction = String(order).toLowerCase() === "desc" ? "DESC" : "ASC";
      baseQuery += ` ORDER BY "${sortBy}" ${direction}, created_at DESC`;
    } else {
      baseQuery += ` ORDER BY created_at DESC`;
    }

    const limitNum = Number(limit) > 0 ? Number(limit) : 12;
    values.push(limitNum);
    baseQuery += ` LIMIT $${values.length}`;
    const { rows } = await pool.query(baseQuery, values);

    res.status(200).json({ success: true, count: rows.length, data: rows });
  }),
);

apiProjectsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
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
  }),
);

apiProjectsRouter.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload: Partial<ProjectPayload> = req.body;

    const updateProjectQuery = `
    UPDATE projects
    SET name = COALESCE($1, name),
        client = COALESCE($2, client),
        url = COALESCE($3, url),
        category = COALESCE($4, category),
        "unitBudget" = COALESCE($5, "unitBudget")
    WHERE id = $6
    RETURNING *;
  `;

    const values = [
      payload.name ?? null,
      payload.client ?? null,
      payload.url ?? null,
      payload.category ?? null,
      payload.unitBudget ?? null,
      id,
    ];

    const { rows } = await pool.query(updateProjectQuery, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated", data: rows[0] });
  }),
);

apiProjectsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleteProjectQuery = `
    DELETE FROM projects
    WHERE id = $1
    RETURNING *;
  `;

    const { rows } = await pool.query(deleteProjectQuery, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted", data: rows[0] });
  }),
);

export default apiProjectsRouter;
