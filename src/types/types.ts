export type QuestionType =
  | 'MultipleChoice'
  | 'MultipleSelect'
  | 'Matching'
  | 'FillBlank'
  | 'TrueFalse'
  | 'Numeric'
  | 'Ordering';

export interface DroppedQuestion {
  uid: string; // use stable uid, e.g., 'MultipleChoice'
  type: QuestionType;
}

export interface MainContainerProps {
  dropped: DroppedQuestion[];
  setDropped: React.Dispatch<React.SetStateAction<DroppedQuestion[]>>;
}

export interface ComponentNameProps {
  uid?: string;
  preview?: boolean;
}
