import { Tool } from "@domain/entities/tool.entity";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager) {
    const tool = new Tool({ name: "Miguel Brito", slug: "miguel-brito" });
    await em.persistAndFlush(tool);
  }
}
