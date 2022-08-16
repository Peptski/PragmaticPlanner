export class Leg {
  constructor(
    public name: string,
    public sname: string,
    public journeyNumber: string,
    public type: string,
    public id: string,
    public direction: string,
    public fgColor: string,
    public bgColor: string,
    public stroke: string,
    public accessibility: string,
    public Origin: {
      name: string;
      type: string;
      id: string;
      routeIdx: string;
      time: string;
      date: string;
      track: string;
      rtTime: string;
      rtDate: string;
      $: string;
    },
    public Destination: {
      name: string;
      type: string;
      id: string;
      routeIdx: string;
      time: string;
      date: string;
      track: string;
      rtTime: string;
      rtDate: string;
      $: string;
    },
    public JourneyDetailRef: {
      ref: string;
    }
  ) {}
}
