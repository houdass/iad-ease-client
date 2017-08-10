export class Resource {

  public operations: any;

  constructor(res: any) {
    this.operations = res ? res.operation : [];
  }

  operationAllowed(operation: any) {
    return this.operations.indexOf(operation) !== -1;
  }
}
