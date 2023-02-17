import { Injectable } from '@nestjs/common';
import amocrmApi from '../../api/amocrmApi';

const commonRequestPayload = {
  data: [{}],
};

@Injectable()
export class AmocrmService {
  async createLeads() {
    const { data } = await amocrmApi.post('leads', commonRequestPayload);
    return data;
  }
  async createContacts() {
    const { data } = await amocrmApi.post('contacts', commonRequestPayload);
    return data;
  }
  async createCompanies() {
    const { data } = await amocrmApi.post('companies', commonRequestPayload);
    return data;
  }
}
