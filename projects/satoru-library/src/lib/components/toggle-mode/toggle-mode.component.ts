import { Component, Input, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'sat-toggle-mode',
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.css'],
})
export class ToggleModeComponent implements OnInit {

  @Input() showLabel = true;
  @Input() isContext = true;

  mode!: string;

  constructor(private modeService: ModeService, private contextService: ContextService) {}

  ngOnInit() {
    this.mode = this.isContext ? this.contextService.getContext() : this.modeService.getMode();
  }

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
