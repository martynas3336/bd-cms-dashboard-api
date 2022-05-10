import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './entities/image.entity';
import { Variation } from '../variations/entities/variation.entity';
import { S3, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { config } from '../../config';

@Injectable()
export class ImagesService {
  private s3Provider: S3;
  constructor(
    @InjectModel(ModelNamesEnum.IMAGE)
    private readonly imageRepository: Model<Image>,
    @InjectModel(ModelNamesEnum.VARIATION)
    private readonly variationRepository: Model<Variation>,
  ) {
    this.s3Provider = new S3({
      region: config.awsCdnS3Region,
    });
  }

  async fix(projectId: string): Promise<any> {
    const variations: Variation[] = await this.variationRepository.find({
      projectId,
    });

    await Promise.all(
      variations.map(async (variation: Variation) => {
        variation.images.map(async (entry: string) => {
          await new this.imageRepository({
            projectId: projectId,
            size: 0,
            mimetype: 'image/jpeg',
            bucket: '',
            awsFileName: '',
            url: entry,
          }).save();
        });
      }),
    );

    return {};
  }

  public async getAll(projectId: string) {
    const images = await this.imageRepository.find({
      projectId,
      status: { $ne: 'deleted' },
    });
    return { items: images };
  }

  public async get(projectId: string, imageId: string) {
    const image = await this.imageRepository.findOne({
      projectId,
      id: imageId,
      status: { $ne: 'deleted' },
    });
    return { item: image };
  }

  public async delete(projectId: string, id: string): Promise<Image> {
    const image: Image = await this.imageRepository.findOne({
      _id: id,
      projectId,
    });
    await this.imageRepository.updateOne({ _id: id }, { status: 'deleted' });
    return image;
  }

  public async add(
    projectId: string,
    image: {
      version: string;
      url: string;
      awsFileName: string;
      fieldname: string;
      originalname: string;
      mimetype: string;
      size: number;
      Key: string;
      Bucket: string;
    },
  ) {
    const imageRepo = await this.imageRepository.create({
      url: image.url,
      awsFileName: image.awsFileName,
      size: image.size,
      mimetype: image.mimetype,
      fileName: image.Key,
      bucket: image.Bucket,
      projectId,
    });
    return {
      awsFileName: image.awsFileName,
      id: imageRepo._id,
      url: image.url || imageRepo.url,
      image: image,
      imageRepo: imageRepo,
    };
  }

  async uploadAwsOneFile(file: Express.Multer.File, projectId: string) {
    const awsFileName = `project/${projectId}/${uuidv4()}-${file.filename}`;
    const url = `${config.awsCdnHost}/${awsFileName}`;
    await this.s3Provider.send(
      new PutObjectCommand({
        Bucket: config.awsCdnS3BucketName,
        Key: awsFileName,
        Body: file.buffer,
      }),
    );

    return {
      version: 'v1',
      url,
      awsFileName,
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      Key: awsFileName,
      Bucket: '',
    };
  }

  async deleteFile(fileNameKey: string) {
    await this.s3Provider.send(
      new DeleteObjectCommand({
        Bucket: config.awsCdnS3BucketName,
        Key: fileNameKey,
      }),
    );
    return {};
  }
}
