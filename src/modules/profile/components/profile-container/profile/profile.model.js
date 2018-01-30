// @flow
export default class ProfileModel<IProfile> {
  firstName: string = "";
  lastName: string = "";
  documentNumber: string = "";
  birthday: Date = new Date();
  avatar: string = "";
  email: string = "";
  balance: number = 0;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export function constructFromObject(data: Object, obj: Object) {
  if (obj === undefined) return null;
  Object.keys(obj).forEach(x => {
    if (obj[x] !== null && data[x] !== undefined) {
      data[x] = obj[x];
    }
  });

  return data;
}
