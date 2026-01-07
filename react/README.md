# @jojovms/react-spotlight-tour

React wrapper for `@jojovms/spotlight-tour-core`.

## Installation

```bash
npm install @jojovms/react-spotlight-tour
```

## Usage

```jsx
import { TourProvider, useTour } from '@jojovms/react-spotlight-tour';

// 1. Wrap your app (or part of it) with TourProvider
function App() {
  const steps = [
    { target: '#step1', content: 'Step 1 description' },
    { target: '#step2', content: 'Step 2 description' }
  ];

  return (
    <TourProvider steps={steps}>
      <MainContent />
    </TourProvider>
  );
}

// 2. Use the hook in any child component
function MainContent() {
  const { start } = useTour();

  return (
    <div>
      <button id="step1">Feature 1</button>
      <button id="step2">Feature 2</button>
      
      <button onClick={start}>Start Tutorial</button>
    </div>
  );
}
```

## License

MIT © [Shijo Shaji](https://shijoshaji.in)
