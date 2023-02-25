import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  public id!: string;

  @Property()
  public createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();

  public constructor(props?: BaseProps) {
    if (props != null) {
      if (props.id != null) {
        this.id = props.id;
      }
    }
  }
}

export type BaseProps = {
  id?: string;
}
