import { Photo } from './photo';

export interface Member {
  Id: number;
  UserName: string;
  Age: number;
  KnownAs: string;
  Created: Date;
  LastActive: Date;
  Gender: string;
  Introduction: string;
  LookingFor: string;
  Interests: string;
  City: string;
  Country: string;
  PhotoUrl: string;
  Photos: Photo[];
}



