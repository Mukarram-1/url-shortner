import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, Req, UseGuards, ForbiddenException, InternalServerErrorException, } from '@nestjs/common';
import { LogosService } from './logos.service';
import { CreateLogoDto } from './dto/create-logo.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('logos')
export class LogosController {
  constructor(private readonly logosService: LogosService) { }
  //CREATE LOGO:
  @UseInterceptors(FileInterceptor('logoImage', {
    storage: diskStorage({
      destination: './common/public/temp',
      filename: (req, file, cb) => {
        const fileName: string = file.originalname.split('.')[0];
        const fileExtension: string = file.originalname.split('.')[1];
        const newFileName: string = fileName.split(" ").join("_")
          + "_" +
          Date.now() +
          "." +
          fileExtension;
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false);
      }
      cb(null, true);
    }

  }))

  @Post('upload')
  async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const user_id = req['user']['user_id'];
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.logosService.uploadFile(user_id, file);
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user_id = req['user']['user_id'];
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.logosService.findAll(user_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogoDto: UpdateLogoDto) {
    return this.logosService.update(+id, updateLogoDto);
  }
  @Delete('delete')
  async remove(@Req() req: Request, @Body('secure_url') secure_url: string): Promise<any> {
    const user_id = req['user']['user_id'];
    console.log("user id in remove controler: ", user_id);
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.logosService.remove(user_id, secure_url);
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
