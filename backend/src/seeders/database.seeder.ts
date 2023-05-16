import { Language } from "@domain/entities/language.entity";
import { Tool } from "@domain/entities/tool.entity";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager) {
    const javaLang = new Language();
    javaLang.name = "Java";
    javaLang.slug = "java";

    const miguelBritoTool = new Tool();
    miguelBritoTool.slug = "miguel-brito";
    miguelBritoTool.name = "Miguel Brito";
    miguelBritoTool.languages.add(javaLang);

    const openapiLang = new Language();
    openapiLang.name = "OpenAPI";
    openapiLang.slug = "openapi";

    const dongjinYuTool = new Tool();
    dongjinYuTool.slug = "dongjin-yu";
    dongjinYuTool.name = "Dongjin Yu";
    dongjinYuTool.languages.add(openapiLang);

    await em.persistAndFlush([
      javaLang,
      miguelBritoTool,
      openapiLang,
      dongjinYuTool,
    ]);
  }
}
