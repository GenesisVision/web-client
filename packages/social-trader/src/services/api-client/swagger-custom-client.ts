import {
  ApiClient,
  AssetsApi,
  AuthApi,
  DashboardApi,
  EventsApi,
  FileApi,
  FollowApi,
  FundsApi,
  InvestmentsApi,
  NotificationsApi,
  PlatformApi,
  ProfileApi,
  ProgramsApi,
  SignalApi,
  SocialApi,
  TradingaccountApi,
  WalletApi
} from "gv-api-web";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import authService from "services/auth-service";
import { getApiUrl } from "utils/config-helpers";

import withApiProxy from "./api-proxy";

const apiUrl = getApiUrl();

const isBrowser = () => {
  return process.browser;
};

class AuthClient extends ApiClient {
  token?: Token;

  constructor(apiUrl?: string, token?: Token) {
    super(apiUrl);
    this.token = token;
  }
  fetch(input: RequestInfo, init?: RequestInit) {
    const auth = this.token?.getHeader();

    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...auth
      }
    });
  }

  public static create(token?: Token) {
    return new AuthClient(apiUrl, token);
  }
}

class Client extends ApiClient {
  token: Token;
  authApi: AuthApi;

  constructor(
    apiUrl: string = "https://localhost/api",
    token: Token,
    authApi: AuthApi
  ) {
    super(apiUrl);
    this.token = token;
    this.authApi = authApi;
  }

  async fetch(input: RequestInfo, init?: RequestInit) {
    if (this.token.isExpiring() && isBrowser()) {
      const token = await this.authApi.updateAuthToken();
      this.token.restore(token);
    }
    const auth = this.token.getHeader();
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...auth
      }
    });
  }

  public static create(token: Token = Token.create(), authApi: AuthApi) {
    return new Client(apiUrl, token, authApi);
  }
}

const client = new ApiClient(apiUrl);
export default client;

export class Api {
  auth = (token?: Token): AuthApi =>
    withApiProxy(new AuthApi(AuthClient.create(token)));

  profile = (token: Token = Token.create()): ProfileApi =>
    withApiProxy(new ProfileApi(Client.create(token, this.auth(token))));

  dashboard = (token: Token): DashboardApi =>
    withApiProxy(new DashboardApi(Client.create(token, this.auth(token))));

  platform = (token: Token = Token.create()): PlatformApi =>
    withApiProxy(new PlatformApi(Client.create(token, this.auth(token))));

  programs = (token?: Token): ProgramsApi => {
    return withApiProxy(
      new ProgramsApi(Client.create(token, this.auth(token)))
    );
  };

  investments = (token: Token): InvestmentsApi => {
    return withApiProxy(
      new InvestmentsApi(Client.create(token, this.auth(token)))
    );
  };

  funds = (token?: Token): FundsApi => {
    return withApiProxy(new FundsApi(Client.create(token, this.auth(token))));
  };

  notifications = (token?: Token): NotificationsApi =>
    withApiProxy(new NotificationsApi(Client.create(token, this.auth(token))));

  events = (token?: Token): EventsApi =>
    withApiProxy(new EventsApi(Client.create(token, this.auth(token))));

  follows = (token?: Token): FollowApi =>
    withApiProxy(new FollowApi(Client.create(token, this.auth(token))));

  files = (token?: Token): FileApi =>
    withApiProxy(new FileApi(Client.create(token, this.auth(token))));

  assets = (token?: Token): AssetsApi =>
    withApiProxy(new AssetsApi(Client.create(token, this.auth(token))));

  accounts = (token?: Token): TradingaccountApi =>
    withApiProxy(new TradingaccountApi(Client.create(token, this.auth(token))));

  wallet = (token: Token = Token.create()): WalletApi =>
    withApiProxy(new WalletApi(Client.create(token, this.auth(token))));

  social = (token?: Token): SocialApi =>
    withApiProxy(new SocialApi(Client.create(token, this.auth(token))));

  signal = (token: Token = Token.create()): SignalApi =>
    withApiProxy(new SignalApi(Client.create(token, this.auth(token))));
}

export const api = new Api();

export class Token {
  private token: string = "";
  private constructor(ctx?: NextPageContext) {
    this.token = authService.getAuthArg(ctx);
  }
  public static create(ctx?: NextPageContext) {
    return new Token(ctx);
  }
  isExist = (): boolean => {
    return this.token.length >= 0;
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
    authService.storeToken(token);
  };

  isExpiring = (): boolean => {
    return false;
  };
}
