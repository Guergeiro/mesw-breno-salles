import { S3, S3ClientConfig } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type S3RequiredFile = {
  buffer: Buffer;
  id: string;
  mimetype: string;
};

@Injectable()
export class S3ClientService {
  private readonly bucket = "mesw-breno-salles";
  private readonly client: S3;

  public constructor(configService: ConfigService) {
    const accessKeyId = configService.get<string>("s3.ACCESS_KEY");
    const secretAccessKey = configService.get<string>("s3.SECRET_KEY");
    const region = configService.get<string>("s3.REGION");
    if (accessKeyId == null || secretAccessKey == null || region == null) {
      throw new Error();
    }
    const s3Config: S3ClientConfig = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    };
    const isProduction =
      configService.get<string>("NODE_ENV") !== "development";

    if (isProduction === false) {
      s3Config.endpoint = "http://localstack:4566";
      s3Config.forcePathStyle = true;
      s3Config.tls = false;
    }

    this.client = new S3(s3Config);
  }

  public async getObject(id: string) {
    return await this.client.getObject({ Key: id, Bucket: this.bucket });
  }

  public async createObject({ buffer, id, mimetype }: S3RequiredFile) {
    return await this.client.putObject({
      Key: id,
      ContentType: mimetype,
      Body: buffer,
      Bucket: this.bucket,
    });
  }
}
