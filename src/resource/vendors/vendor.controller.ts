import { Controller, Get, Post } from '@nestjs/common';
import { VendorService } from './vendor.service';
// import { UsersService } from '../users/users.service';

@Controller('vendors')
export class VendorController {
  constructor(
    private vendorService: VendorService,
    // private userService: UsersService,
  ) {}
  @Post()
  create() {}

  @Get()
  async findAll() {
    return this.vendorService.getAllVendors();
  }
}
