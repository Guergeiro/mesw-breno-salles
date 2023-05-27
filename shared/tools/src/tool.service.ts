import {
  ToolControllerInput as MGInput,
  ToolControllerOutput as MGOutput,
} from "./schemas/miguel-brito";

type Input = MGInput;

type Output = MGOutput;

export interface ToolService {
  startJob(input: Input): Promise<void>;
  endJob(output: Output): Promise<void>;
}
