import { Language } from "@domain/entities/language.entity";
import { EntityRepository } from "@mikro-orm/postgresql";

export class LanguageRepository extends EntityRepository<Language> {}
