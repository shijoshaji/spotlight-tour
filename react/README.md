# @jojovms/react-spotlight-tour

React wrapper for `@jojovms/spotlight-tour-core`.

## Installation

```bash
npm install @jojovms/react-spotlight-tour
```

## Usage

```jsx
import { useSpotlightTour } from '@jojovms/react-spotlight-tour';

function App() {
  const { startTour } = useSpotlightTour({
    steps: [
      { target: '#step1', content: 'Step 1 description' },
      { target: '#step2', content: 'Step 2 description' }
    ]
  });

  return (
    <div>
      <button id="step1">Feature 1</button>
      <button id="step2">Feature 2</button>
      
      <button onClick={startTour}>Start Tutorial</button>
    </div>
  );
}
```
