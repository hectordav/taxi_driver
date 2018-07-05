import {Injectable} from "@angular/core";
import {REPORT} from "./mock-report";

@Injectable()
export class ReportService {
  private report:any;

  constructor() {
    this.report = REPORT;
  }

  getAll() {
    return this.report;
  }
}