import { Component, Input } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'sat-toggle-mode',
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.css'],
})
export class ToggleModeComponent {

  @Input() showLabel = true;
  @Input() isContext = true;

  mode!: string;
  context!: string;

  constructor(private modeService: ModeService, private contextService: ContextService) {
    if (this.isContext) {
      this.context = this.contextService.getContext();
    } else {
      this.mode = this.modeService.getMode();
    }
  }

  ngOnInit() {}

  async toggleMode(event: any): Promise<void> {
    const checked = event.checked;
    const mode = (checked) ? (this.isContext ? '0' : 'test') : (this.isContext ? '1' : 'prod');
    if (this.isContext) {
      this.contextService.setContext(mode, true);
    } else {
      this.modeService.setMode(mode, true);
    }
  }

}
