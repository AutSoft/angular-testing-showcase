export class NewComplaint {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  content: string;
  imageSource: string;

  constructor(from?: NewComplaint) {
    if (!from) { return; }
    this.name = from.name;
    this.email = from.email;
    this.phoneNumber = from.phoneNumber;
    this.subject = from.subject;
    this.content = from.content;
    this.imageSource = from.imageSource;
  }
}
