import { Stop } from './stop.model';

export class Detail {
  constructor(
    public Color: { fgColor: string; bgColor: string; stroke: string },
    public Direction: { $: string }[],
    public GeometryRef: { ref: string },
    public JourneyName: { name: string }[],
    public JourneyType: { type: string }[],
    public Stop: Stop[]
  ) {}
}
