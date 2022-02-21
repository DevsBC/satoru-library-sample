import { ModeService } from './mode.service';
import { Inject, Injectable } from '@angular/core';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  private server = this.env.server;
  private version: number | undefined;
  private app!: string;
  private mode = 'test';

  constructor(private modeService: ModeService,  @Inject('env') private env: any, private contextService: ContextService) { }

  public initServerConnection(app: string, endpoint: string, version?: number): string {
    this.mode = this.modeService.getMode();
    this.app = app;
    this.version = version;
    const baseUrl = this.getBaseUrl(endpoint);
    return baseUrl;
  }

  private getBaseUrl(endpoint?: string): string {
    let url: string;
    if (this.version) {
      url = `${this.server}/${this.version}/${this.app}/${this.mode}`;
    } else {
      url = `${this.server}/${this.app}/${this.mode}`;
    }
    return url + ((endpoint) ? '/' + endpoint : '');
  }

  public connect(client: string, app: string, endpoint: string) {
    const context = this.contextService.getContext();
    return `${ this.server }/${ context }/${ client }/${ app }/${ endpoint }`;
  }
}
