# @jojovms/spotlight-tour-core

A vanilla JS library for creating guided walkthroughs and feature tours.

## Installation

```bash
npm install @jojovms/spotlight-tour-core
```

## Usage

```javascript
import { SpotlightTour } from '@jojovms/spotlight-tour-core';

const tour = new SpotlightTour({
  steps: [
    {
      target: '#header',
      title: 'Welcome!',
      content: 'This is the main header.'
    },
    {
      target: '.feature-btn',
      title: 'Click Me',
      content: 'This button does amazing things.'
    }
  ],
  onComplete: () => console.log('Tour finished!')
});

// Start the tour
tour.start();
```

## Configuration

| Option | Type | Description |
|---|---|---|
| `steps` | `Array` | List of tour steps (see Step Object below). |
| `overlayColor` | `string` | Color of the backdrop (default: `rgba(0,0,0,0.6)`). |
| `onComplete` | `Function` | Callback when tour finishes. |
| `onSkip` | `Function` | Callback when user skips the tour. |

### Step Object

```javascript
{
  target: string;   // CSS Selector (e.g., '#my-id')
  title?: string;   // Tooltip title
  content: string;  // Tooltip body
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Preferred position
}
```
