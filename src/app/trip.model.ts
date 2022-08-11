export class Trip {
  constructor(
    public stops: String[],
    public arrival: number,
    public departure: number,
    public waitingPerStop: number,
    public travelTimePerStop: number[]
  ) {}
}
