'use client';

import { Button } from '../ui/button';

const TrueFalsePattern = () => {
  return (
    <div>
      <h3 className="bg-gray-200 p-4 flex justify-center text-md border-b border-gray-300 font-semibold">
        True or False
      </h3>

      <div className="px-4">
        {/* tabs */}
        <div className="flex justify-center items-center gap-5 border-b border-gray-300 py-1">
          <Button>General</Button>
          <Button>Rubrics</Button>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default TrueFalsePattern;
