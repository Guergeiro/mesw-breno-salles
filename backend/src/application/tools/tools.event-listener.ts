import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ToolsEventListener {
  @OnEvent("tools.foo")
  public handleTools() {}
}
