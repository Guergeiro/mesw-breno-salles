import { Language } from "@domain/entities/language.entity";
import { Tool } from "@domain/entities/tool.entity";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager) {
    const languages = [
      { name: "Java", slug: "java" },
      { name: "OpenAPI", slug: "openapi" },
    ];

    for (const lang of languages) {
      const exists = await em.findOne(Language, { slug: lang.slug });
      if (exists != null) {
        continue;
      }
      const newLang = new Language();
      newLang.name = lang.name;
      newLang.slug = lang.slug;
      em.persist(newLang);
    }
    await em.flush();

    const tools = [
      { name: "Miguel Brito", slug: "miguel-brito", langSlug: "java" },
      { name: "Dongjin Yu", slug: "dongjin-yu", langSlug: "openapi" },
    ];
    for (const tool of tools) {
      const exists = await em.findOne(Tool, { slug: tool.slug });
      if (exists != null) {
        continue;
      }
      const lang = await em.findOne(Language, { slug: tool.langSlug });
      if (lang == null) {
        continue;
      }
      const newTool = new Tool();
      newTool.slug = tool.slug;
      newTool.name = tool.name;
      newTool.languages.add(lang);
      em.persist(newTool);
    }

    await em.flush();
  }
}
