export namespace Accounts {
  interface IAccount {
    address: string | "";
    privateKey: string | "";
  }

  export const one = <IAccount>{
    address: process.env.TEST_ACCOUNT_ONE_ADDRESS,
    privateKey: process.env.TEST_ACCOUNT_ONE_PRIVATE_KEY,
  };

  export const two = <IAccount>{
    address: process.env.TEST_ACCOUNT_TWO_ADDRESS,
    privateKey: process.env.TEST_ACCOUNT_TWO_PRIVATE_KEY,
  };
}
