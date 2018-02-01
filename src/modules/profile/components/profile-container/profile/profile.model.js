// @flow
import { IProfile } from "./profile.type";

export default class ProfileModel implements IProfile {
  firstName: string = "Your";
  lastName: string = "Name";
  documentNumber: string = "";
  birthday: Date = new Date();
  avatar: string = "http://via.placeholder.com/350x650";
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
