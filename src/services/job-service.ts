import {Injectable} from "@angular/core";
import {JOBS} from "./mock-jobs";

@Injectable()
export class JobService {
  private jobs:any;

  constructor() {
    this.jobs = JOBS;
  }

  getAll() {
    return this.jobs;
  }

  getItem(id) {
    for (var i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === parseInt(id)) {
        return this.jobs[i];
      }
    }
    return null;
  }

  remove(item) {
    this.jobs.splice(this.jobs.indexOf(item), 1);
  }
}