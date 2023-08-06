export interface Add_CMP_JSON {
  imp: IMP;
  ctype: string;
  query: any;
  alias: string;
  ip: boolean;
  track: boolean;
  dc_ep: string;
  query_map: any;
  eps: EPS[];
}

export interface FULL_CMP_JSON {
  id: number;
  hid: string;
  imp: IMP;
  ctype: string;
  query: any;
  alias: string;
  ip: boolean;
  track: boolean;
  dc_ep: string;
  query_map: any;
  eps: EPS[];
}

export interface IMP {
  count: number;
  tsp?: number;
  recurring: boolean;
}

export interface EPS {
  geo: EPS_GEO;
  weight: number;
  ep: string;
}

export interface EPS_GEO {
  grp: string[];
  bl: boolean;
}