import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UrlService {
    async createUrl(original) {
        const existingUrl = await prisma.url.findFirst({
            where: { original }
        });
        if (existingUrl) {
            return existingUrl;
        }
        const shortCode = this.generateShortCode();
        return await prisma.url.create({
            data: {
                original,
                shortCode,
            },
        });
    }
    generateShortCode() {
        return Math.random().toString(36).substring(2, 2 + 6);

    }
}
