import { ToolRepository } from "@domain/repositories/tool.repository";
import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity, BaseProps } from "./base.entity";
import { Result } from "./result.entity";

@Entity({ customRepository: () => ToolRepository })
export class Tool extends BaseEntity {
  @Property()
  public name = "";

  @Property()
  public slug = "";

  @OneToMany(() => Result, (result) => result.tool)
  public results = new Collection<Result>(this);

  public constructor(props?: ToolProps) {
    super(props);
    if (props != null) {
      const keys = ["name", "slug"] as const;
      for (const key of keys) {
        const value = props[key];
        if (value != null) {
          this[key] = value;
        }
      }
    }
  }
}

export type ToolProps = BaseProps & {
  name?: string;
  slug?: string;
};
