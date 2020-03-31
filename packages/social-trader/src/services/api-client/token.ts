import jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import authService, { TokenDto } from "services/auth-service";

const EXPIRE_TIME = 60 * 60;

export default class Token {
  private token: string = "";

  private constructor(ctx?: NextPageContext) {
    this.token = authService.getAuthArg(ctx);
  }
  public static create(ctx?: NextPageContext) {
    return new Token(ctx);
  }
  isExist = (): boolean => {
    return this.token.length > 0;
  };

  getHeader = () => {
    return {
      Authorization: this.isExist() ? `Bearer ${this.token}` : ""
    };
  };

  get value() {
    return this.token;
  }

  restore = (token: string) => {
    this.token = token;
    authService.storeToken(token);
  };

  isExpired = (): boolean => {
    if (!this.isExist()) return true;
    const expiresIn = this.expiresIn();
    return expiresIn < 0;
  };

  expiresIn = (): number => {
    const { exp } = jwt_decode<TokenDto>(this.token);
    const date = new Date().getTime() / 1000;
    return exp - Math.ceil(date);
  };

  isExpiring = (): boolean => {
    if (!this.isExist() || this.isExpired()) return false;
    const expiresIn = this.expiresIn();
    return expiresIn < EXPIRE_TIME;
  };
}
