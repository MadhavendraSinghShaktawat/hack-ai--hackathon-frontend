const API_PORT = 3000; // Backend port
const API_URL = `http://localhost:${API_PORT}/api`;

class AppConfig {
  private static instance: AppConfig;
  private _apiBaseUrl: string = API_URL;

  private constructor() {}

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public async getApiBaseUrl(): Promise<string> {
    return this._apiBaseUrl;
  }
}

export const appConfig = AppConfig.getInstance(); 