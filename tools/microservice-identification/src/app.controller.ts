import { Controller, Inject } from '@nestjs/common';

import {promisify} from "node:util";
import {exec} from "node:child_process"
import { ClientRedis, EventPattern } from '@nestjs/microservices';
const myexec = promisify(exec);

async function lsDir() {
  // const { stdout, stderr } = await myexec("cd /usr/src/app/tool/app && python3 /usr/src/app/tool/app/main.py --project /usr/src/app/project");
  const { stdout, stderr } = await myexec("cat /usr/src/app/tool/app/clustering.txt");
  // add the following code
  if (stderr) {
    console.error(stderr);
  }
  console.log(`External Program's output: ${stdout}`);
}


@Controller()
export class AppController {
  private readonly redisClient: ClientRedis;

  public constructor(@Inject("REDIS_CLIENT") redisClient: ClientRedis) {
    this.redisClient = redisClient;
  }

  @EventPattern('start')
  public async getHello(data: string) {
    console.log(data)
    await lsDir();
    this.redisClient.emit("end", "pong")
  }
}
