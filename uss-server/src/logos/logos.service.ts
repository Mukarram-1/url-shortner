import { BadRequestException, Injectable, InternalServerErrorException, Query } from '@nestjs/common';
import { CreateLogoDto } from './dto/create-logo.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { Prisma, users, logo } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { CloudinaryService } from 'common/cloudinary.service';
@Injectable()
export class LogosService {
  // private urlsService: UrlsService
  constructor(private readonly databaseService: DatabaseService, private readonly usersService: UsersService, private readonly cloudinaryService: CloudinaryService) { }
  async uploadFile(user_id: string, file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('file is not an image');
      }
      //upload on cloudinary:
      const response: any = await this.cloudinaryService.uploadOnCloudinary(file.path);
      if (!response) {
        throw new InternalServerErrorException('Error uploading image')
      }
      console.log("upload response :", response);
      // return response;

      // create logo entry here in the database.

      const Newlogo: logo = await this.create({ user_id: user_id, logo_path: response.secure_url });
      //on  success-> remove the file from the server locally
      return Newlogo;
    } catch (error) {
      throw new BadRequestException('error in uploading file on cloud');
    }
  }
  async getLogo(localPath: string) {

  }
  async create(createLogoDto: CreateLogoDto) {
    try {
      const newLogo: logo = await this.databaseService.logo.create({ data: createLogoDto });
      if (!newLogo) {
        throw new InternalServerErrorException('Error creating logo')
      }
      return newLogo;
    } catch (error) {
      throw new BadRequestException('error adding logo to data store');
    }
  }

  async findAll(user_id: string): Promise<logo[] | undefined> {
    try {
      const logos: logo[] = await this.databaseService.logo.findMany({ where: { user_id } });
      if (!logos) {
        throw new InternalServerErrorException('Error fetching logos')
      }
      // console.log("logos", logos);
      return logos;
    } catch (error) {
      throw new BadRequestException('error in uploading file on cloud');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} logo`;
  }

  update(id: number, updateLogoDto: UpdateLogoDto) {
    return `This action updates a #${id} logo`;
  }

  async remove(user_id: string, secure_url: string): Promise<any> {
    try {
      const deleted: any = await this.cloudinaryService.deleteFromCloudinary(secure_url);
      console.log("delete from cloud response = ", deleted);
      if (!deleted) {
        throw new InternalServerErrorException('Error deleting logo from cloud')
      }
      const deletedLogo = await this.databaseService.logo.deleteMany({ where: { logo_path: secure_url, user_id } });
      return deletedLogo;
    } catch (error) {
      throw new BadRequestException('error in deleting file');
    }
  }
}
