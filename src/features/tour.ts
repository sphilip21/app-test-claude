import { Step } from "react-joyride";

const tour: Step[] = [
  {
    target: '.trg-nav-pages',
    disableBeacon: true,
    content: 'Welcome! This quick tour will walk you through the app!',
  },
  {
    target: '.trg-nav-pages',
    disableBeacon: true,
    content: 'This is the navbar. You can navigate between pages here!',
  },
  {
    target: '.trg-nav-right',
    disableBeacon: true,
    content: 'This is the use menu, where you can see the currently logged in user.',
  },
  {
    target: '.trg-fob',
    disableBeacon: true,
    content: 'This is the actions button!',
  }
]

export default tour;
