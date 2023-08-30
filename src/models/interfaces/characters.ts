import { Document, Model } from "mongoose";

export interface ICHARACTER {
  fullName: string;
  firstName: string;
  lastName: string;
  keyName: string;
  contentKeys: contentKeys;
  targetKeys: targetKeys;
  targetCurrency: targetCurrency;
  title: string;
  subtitle: string;
  offerBarText: string;
  firstSection: firstSection;
  withdrawalText: withdrawalText;
  modal: modal;
}

interface contentKeys {
  language: string;
  countryName: string;
  citizenText: string;
}

interface targetKeys {
  countryName: string;
  countryCode: string;
  capital: string;
}
interface targetCurrency {
  symbol: string;
  code: string;
  name: string;
}
interface firstSection {
  ImgDescription: string;
  celebrityDescription: string;
}
interface withdrawalText {
  bottom: string;
  top: string;
}
interface modal {
  buttonText: string;
  title: string;
  subtitle: string;
}

export interface ICHARACTERDocument extends ICHARACTER, Document {
  toJSON(): ICHARACTERDocument;
}
export interface ICHARACTERModel extends Model<ICHARACTERDocument> {
  getCharacters(): Promise<ICHARACTERDocument[]>;
}
