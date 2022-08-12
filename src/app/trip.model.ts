export class Trip {
  constructor(
    public stops: String[],
    public lines: String[],
    public arrival: Date,
    public departure: Date,
    public arrivalPerStop: Date[]
  ) {}
}
