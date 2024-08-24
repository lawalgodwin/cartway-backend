import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VendorService } from '../services/vendor.service';
import { AdminGuard, AuthenticationGuard } from 'src/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vendors')
@Controller('vendors')
export class VendorController {
  constructor(private vendorService: VendorService) {}
  @Post()
  @UseGuards(AuthenticationGuard, AdminGuard)
  create() {}

  @Get()
  async findAll() {
    return this.vendorService.getAllVendors();
  }
}
