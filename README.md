# Spotlight Tour (Guidō) 🔦

**Guidō** is a flexible and lightweight library for creating spotlight tours (guided walkthroughs) for your web applications. Whether you are using vanilla JavaScript, React, or Angular, Guidō helps you guide your users effectively.

## 📦 Packages

This repository houses the following packages:

| Package | Description |
| :--- | :--- |
| **[`@jojovms/spotlight-tour-core`](./core)** | The core logic for spotlight tours and vanilla JS implementation. |
| **[`@jojovms/react-spotlight-tour`](./react)** | A React wrapper (hook & component) for easy integration. |
| **[`@jojovms/angular-spotlight-tour`](./angular)** | An Angular wrapper (service & directive) for seamless usage. |

## 🚀 Installation

Choose the package that fits your technology stack:

### Core (Vanilla JS)
```bash
npm install @jojovms/spotlight-tour-core
```

### React
```bash
npm install @jojovms/react-spotlight-tour
```

### Angular
```bash
npm install @jojovms/angular-spotlight-tour
```

## 🛠️ Usage

### Core (Vanilla JS)
```javascript
import { SpotlightTour } from '@jojovms/spotlight-tour-core';

const tour = new SpotlightTour({
  steps: [
    {
      element: '#step-1',
      title: 'Welcome',
      content: 'This is the first step of the tour.'
    },
    {
      element: '#step-2',
      title: 'Second Step',
      content: 'Here is another interesting feature.'
    }
  ]
});

tour.start();
```

### React
```jsx
import { SpotlightTourProvider, useSpotlightTour } from '@jojovms/react-spotlight-tour';

function App() {
  return (
    <SpotlightTourProvider steps={steps}>
      <MyComponent />
    </SpotlightTourProvider>
  );
}

function MyComponent() {
  const { startTour } = useSpotlightTour();

  return <button onClick={startTour}>Start Tour</button>;
}
```

### Angular
Import the module in your `app.module.ts`:

```typescript
import { SpotlightTourModule } from '@jojovms/angular-spotlight-tour';

@NgModule({
  imports: [
    SpotlightTourModule
  ],
  // ...
})
export class AppModule { }
```

Use the service to control the tour:
```typescript
import { SpotlightTourService } from '@jojovms/angular-spotlight-tour';

@Component({ ... })
export class AppComponent {
  constructor(private spotlightTourService: SpotlightTourService) {}

  startTour() {
    this.spotlightTourService.start(steps);
  }
}
```

## 👨‍💻 Author

**Shijo Shaji**
- 🌐 Website: [shijoshaji.in](https://shijoshaji.in)
- 🐙 GitHub: [shijoshaji](https://github.com/shijoshaji)

## 📄 License

MIT
