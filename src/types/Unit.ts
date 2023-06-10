export interface Unit {
  id: string;
  description: string;
  initials: string;
  integerType: boolean;
}

export interface InitialState {
  units: Array<Unit>;
}
