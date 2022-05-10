import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Image } from 'src/modules/images/entities/image.entity';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { UploadFileRo } from './ro/upload-file.ro';
import { GetAll } from './ro/get-all.ro';
import { DeleteRo } from './ro/delete.ro';
@ApiTags('Images')
@Controller('api/v1/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: UploadFileRo })
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        documents: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<UploadFileRo> {
    const awsResult = await this.imagesService.uploadAwsOneFile(
      files[0],
      project._id,
    );
    const dbResult = await this.imagesService.add(project._id, awsResult);
    return {
      ...dbResult,
      destination: files[0].destination,
      encoding: files[0].encoding,
      fieldname: files[0].fieldname,
      filename: files[0].filename,
      mimetype: files[0].mimetype,
      originalname: files[0].originalname,
      path: files[0].path,
      size: files[0].size,
    };
  }

  @Get()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: GetAll })
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async getAll(
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetAll> {
    return this.imagesService.getAll(project._id);
  }

  @Delete(':id')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: DeleteRo })
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async delete(
    @ProjectAuthProjectDecorator() project: Project,
    @Param('id') id: string,
  ): Promise<DeleteRo> {
    const image: Image = await this.imagesService.delete(project._id, id);
    await this.imagesService.deleteFile(image.awsFileName);
    return {
      image,
    };
  }
}
