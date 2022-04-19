declare module "georaster" {
  function parseGeoraster(
    input: any,
    metadata?: any,
    debug?: boolean = false
  ): Promise<any>;

  export default parseGeoraster;
}
