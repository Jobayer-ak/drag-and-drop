'use client';

import { useEffect, useMemo } from 'react';
import MultipleSelectorPattern from '../question-create/Multiple-selector_pattern';
import MultipleChoicePattern from '../question-create/Multiple_choice_pattern';
import NumericEntryPattern from '../question-create/Numeric-entry-pattern';
import OrderingPattern from '../question-create/Ordering-pattern';
import TrueFalsePattern from '../question-create/True-false-pattern';
// Define the shape of one question
interface EditableQuestion {
  uid: string;
  type: string;
}

interface MainEditPageProps {
  editableItem: EditableQuestion | undefined;
  activeItemId: string | undefined;
}

const MainEditPage: React.FC<MainEditPageProps> = ({
  editableItem,
  activeItemId,
}) => {
  console.log('activeItem id:', activeItemId);
  console.log('main Edit page: ', editableItem);

  useEffect(() => {}, [editableItem]);

  useMemo(() => activeItemId, [activeItemId]);

  const renderQuestion = () => {
    switch (editableItem[0]?.type || activeItemId) {
      case 'MultipleChoice':
        return <MultipleChoicePattern />;
      case 'MultipleSelect':
        return <MultipleSelectorPattern />;
      case 'TrueFalse':
        return <TrueFalsePattern />;
      case 'Numeric':
        return <NumericEntryPattern />;
      case 'Ordering':
        return <OrderingPattern />;
      default:
        return null;
    }
  };

  return (
    <div
      id="mainEditPage"
      className=" border border-gray-200 rounded-lg min-h-screen bg-white shadow-lg"
    >
      {renderQuestion()}
    </div>
  );
};

export default MainEditPage;
