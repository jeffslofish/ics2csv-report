declare module 'ical.js' {
  interface Component {
    new (jCal: jCal | Array<jCal> | string, parent?: Component): Component;
    getAllSubcomponents: (name: string) => Array<Component>;
    getFirstPropertyValue: (name: string) => string | null;
  }

  interface Event {
    new (component: Component, options?: {}): Event;
    duration: ICAL['Duration'];
    sequence: number;
    summary: string;
    startDate: ICAL['Time'];
  }

  interface Duration {
    toSeconds: () => number;
  }

  interface RecurExpansion {
    new (options: {}): RecurExpansion;
    next: () => ICAL['Time'];
  }

  interface Time {
    toJSDate: () => Date;
  }
  interface jCal {}

  interface ICAL {
    Component: Component;
    Duration: Duration;
    Event: Event;
    RecurExpansion: RecurExpansion;
    Time: Time;
    parse: (input: string) => jCal | Array<jCal>;
  }
  const ICAL: ICAL;
  export default ICAL;
}
