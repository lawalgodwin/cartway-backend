import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/resource/users/users.service';

@Injectable()
export class VendorService {
  constructor(private userService: UsersService) {}

  async getAllVendors() {
    const availableVendors = await this.userService.allVendors();
    const vendors = availableVendors.map((vendor) => {
      const { password, role, ...vendorDetails } = JSON.parse(
        JSON.stringify(vendor),
      );
      return vendorDetails;
    });
    return vendors;
  }
}
