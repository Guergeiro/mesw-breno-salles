import { Tool } from "@domain/entities/tool.entity";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager) {
    const tool = new Tool();
    tool.id = "a9788d9e-c6b3-42bc-980a-8e87a6d5ebd9";
    tool.slug = "miguel-brito";
    tool.name = "Miguel Brito";
    await em.persistAndFlush(tool);
  }
}
