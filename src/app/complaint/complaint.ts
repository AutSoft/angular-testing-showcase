import { NewComplaint } from './new-complaint';

export class Complaint extends NewComplaint {
  id: number;

  constructor(from?: Complaint) {
    super(from);
    if (!from) { return; }
    this.id = from.id;
  }
}
