import { ToolControllerInput as MGInput } from "./schemas/miguel-brito";

type Input = MGInput;

export interface ToolController {
  start(input: Input): Promise<void>;
}
