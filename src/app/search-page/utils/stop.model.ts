export class Stop {
  constructor(
    public name: string,
    public lon: number,
    public lat: number,
    public id: number,
    public idx?: number,
    public depDate?: string,
    public depTime?: string,
    public routeIdx?: string,
    public rtDepDate?: string,
    public rtDepTime?: string,
    public track?: string
  ) {}
}
