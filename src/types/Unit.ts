export interface Unit {
  id: string;
  description: string;
  initials: string;
  type: "integer" | "decimal";
}

export interface InitialState {
  units: Array<Unit>;
}
