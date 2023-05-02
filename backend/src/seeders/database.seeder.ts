import { Decomposition } from "@domain/entities/decomposition.entity";
import { Language } from "@domain/entities/language.entity";
import { Result, Status } from "@domain/entities/result.entity";
import { Service } from "@domain/entities/service.entity";
import { Tool } from "@domain/entities/tool.entity";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager) {
    const language = new Language();
    language.name = "Java";
    language.slug = "java";

    const tool = new Tool();
    tool.id = "a9788d9e-c6b3-42bc-980a-8e87a6d5ebd9";
    tool.slug = "miguel-brito";
    tool.name = "Miguel Brito";
    tool.languages.add(language);

    const results = this.getResults(3);
    tool.results.add(results);

    await em.persistAndFlush([language, tool]);
  }

  private getResults(n: number) {
    const results: Result[] = [];
    for (let i = 0; i < n; i += 1) {
      const result = new Result();
      result.status = Status.FINISHED;
      result.decompositions.add(
        this.getDecompositions(Math.ceil(Math.random() * 4))
      );
      results.push(result);
    }
    return results;
  }

  private getDecompositions(n: number) {
    const decompositions: Decomposition[] = [];
    for (let i = 0; i < n; i += 1) {
      const decomposition = new Decomposition({
        metadata: {
          resolution: Math.random(),
          modularity: Math.random(),
        },
      });
      const service1 = new Service({
        name: "service1",
        modules: ["moduleA", "moduleB", "moduleC"],
      });
      const service2 = new Service({
        name: "service2",
        modules: ["moduleD", "moduleE"],
      });
      service1.relationships.add(service2);
      service2.relatedServices.add(service1);
      decomposition.services.add(service1, service2);
      if (i % 2 === 0) {
        const service3 = new Service({
          name: "service3",
          modules: ["moduleF", "moduleG", "moduleH", "moduleI"],
        });
        const service4 = new Service({
          name: "service4",
          modules: ["moduleJ"],
        });
        service2.relationships.add(service3, service4);
        service3.relatedServices.add(service2);
        service4.relatedServices.add(service2);
        decomposition.services.add(service3, service4);
      } else {
        const service3 = new Service({
          name: "service3",
          modules: ["moduleF", "moduleG", "moduleH", "moduleI", "moduleJ"],
        });
        service2.relationships.add(service3);
        service3.relatedServices.add(service1);
        decomposition.services.add(service3);
      }
      decompositions.push(decomposition);
    }
    return decompositions;
  }
}
