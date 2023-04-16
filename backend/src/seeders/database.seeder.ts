import {
  Decomposition,
  Service,
} from "@domain/entities/decomposition.entity";
import { Language } from "@domain/entities/language.entity";
import { Result, Status } from "@domain/entities/result.entity";
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

    const results = this.getResults(7)
    tool.results.add(results)

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
        }
      });
      decomposition.services.push(
        new Service({
          name: "service1",
          modules: ["moduleA", "moduleB", "moduleC"],
        }),
        new Service({
          name: "service2",
          modules: ["moduleD", "moduleE"],
        })
      );
      if (i % 2 === 0) {
        decomposition.services.push(
          new Service({
            name: "service3",
            modules: ["moduleF", "moduleG", "moduleH", "moduleI"],
          }),
          new Service({
            name: "service4",
            modules: ["moduleJ"],
          })
        );
      } else {
        decomposition.services.push(
          new Service({
            name: "service3",
            modules: ["moduleF", "moduleG", "moduleH", "moduleI", "moduleJ"],
          }),
        );
      }
      decompositions.push(decomposition)
    }
    return decompositions;
  }
}
