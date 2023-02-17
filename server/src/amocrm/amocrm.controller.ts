import { Controller, Post } from '@nestjs/common';
import { AmocrmService } from './amocrm.service';

@Controller('amocrm')
export class AmocrmController {
  constructor(private readonly amocrmService: AmocrmService) {}

  @Post('/leads')
  createLeads() {
    return this.amocrmService.createLeads();
  }
  @Post('/contacts')
  createContacts() {
    return this.amocrmService.createContacts();
  }
  @Post('/companies')
  createCompanies() {
    return this.amocrmService.createCompanies();
  }
}
