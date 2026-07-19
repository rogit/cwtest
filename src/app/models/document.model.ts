// export type AnnotationType = 'TEXT';
export type AnnotationType = 'TEXT' | 'TEXT2';

type AnnotationDataType = string;

export interface Annotation {
  id: number;
  type: AnnotationType;
  data: AnnotationDataType;
  x: number; // percent
  y: number; // percent
}

export interface Page {
  number: number;
  imageUrl: string;
  annotations?: Annotation[];
}

export interface Document {
  name: string;
  pages: Page[];
}
