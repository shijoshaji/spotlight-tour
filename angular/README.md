# @jojovms/angular-spotlight-tour

Angular wrapper for `@jojovms/spotlight-tour-core`.

## Installation

```bash
npm install @jojovms/angular-spotlight-tour
```

## Usage

```typescript
import { Component } from '@angular/core';
import { SpotlightTourService } from '@jojovms/angular-spotlight-tour';

@Component({...})
export class AppComponent {
  constructor(private tourService: SpotlightTourService) {}

  startTour() {
    this.tourService.start({
      steps: [
        { target: '#btn1', content: 'This is button 1' },
        { target: '#btn2', content: 'This is button 2' }
      ]
    });
  }
}
```
