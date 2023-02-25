import { Injectable } from "@nestjs/common";
import { PaginatorQueryDto } from "./paginator-query.dto";

@Injectable()
export class PaginatorService {
  public paginate({ limit, page }: PaginatorQueryDto) {
    return {
      offset: limit * (page - 1),
      limit: limit,
    };
  }
}
