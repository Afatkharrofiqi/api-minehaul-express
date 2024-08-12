export class BaseController {
  constructor() {
    this.bindAllMethods();
  }

  private bindAllMethods() {
    const methodNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ) as Array<keyof this>;

    methodNames.forEach((methodName) => {
      const method = this[methodName];
      if (typeof method === 'function' && methodName !== 'constructor') {
        this[methodName] = method.bind(this);
      }
    });
  }
}
