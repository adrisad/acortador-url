import { UrlService } from "../service/url.service.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const urlService = new UrlService();

export class UrlController {
  async create(req, res) {
    try {
      const { original } = req.body || {};
      if (!original) {
        return res.status(400).json({ message: "Falta el campo 'original'." });
      }

      try {
        new URL(original);
      } catch {
        return res.status(400).json({ message: "URL inválida." });
      }

      const created = await urlService.createUrl(original);

      return res.status(201).json({
        id: created.id,
        original: created.original,
        shortCode: created.shortCode,
      });
    } catch (err) {
      if (err?.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Colisión de shortCode, intenta nuevamente." });
      }
      console.error("Create URL error:", err);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  async resolve(req, res) {
    try {
      const { code } = req.params;
      if (!code) {
        return res.status(400).json({ message: "Falta el parámetro 'code'." });
      }

      const record = await prisma.url.findUnique({
        where: { shortCode: code },
      });

      if (!record) {
        return res.status(404).json({ message: "Código no encontrado." });
      }

      return res.json({ original: record.original });
    } catch (err) {
      console.error("Resolve URL error:", err);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};
