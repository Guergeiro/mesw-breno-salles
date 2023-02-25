import {
  ToolControllerInput as MGInput,
  ToolControllerOutput as MGOutput,
} from "./schemas/miguel-brito";

type Input = MGInput;

type OutputUnion = MGOutput;

type Output = Extract<OutputUnion, { status: "success" }>["results"];

export interface ToolService {
  startJob(input: Input): Promise<void>;
  endJob(output: Output): Promise<void>;
}
