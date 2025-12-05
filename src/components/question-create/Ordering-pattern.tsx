import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';

export default function OrderingPattern() {
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('0');
  const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2']);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const applyChanges = () => {
    // handle update logic for dropped item field
    console.log({ description, points, options });
  };

  return (
    <div className="rounded-sm shadow p-4 bg-white w-full max-w-2xl mx-auto">
      <h3 className="bg-gray-200 p-4 flex justify-center text-md border-b border-gray-300 font-semibold rounded">
        Ordering Options
      </h3>

      <div className="px-4 mt-4">
        {/* tabs */}
        <Tabs
          defaultValue="general"
          className="w-full mb-4 border-b border-b-gray-200"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-sm mx-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="rubrics">Rubrics</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Description textarea */}
        <div className="mb-4">
          {/* <label className="text-sm font-medium">Description</label> */}
          <Textarea
            className="mt-1 focus:outline-0 border border-gray-200 focus-visible:ring-0"
            placeholder="Ordering question"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Points field */}
        <div className="mb-4">
          <label className="text-sm font-medium">Points</label>
          <Input
            type="number"
            className="mt-1 border border-gray-200 focus-visible:ring-0"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="text-sm font-medium">Options</label>
          <div className="flex flex-col gap-3 mt-2">
            {options.map((opt, idx) => (
              <Input
                key={idx}
                className="border border-gray-200 focus-visible:ring-0 text-gray-600"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
              />
            ))}
          </div>

          <Button
            onClick={addOption}
            className="mt-3 w-full text-gray-600 border border-gray-200 focus-visible:ring-0 cursor-pointer"
            variant="outline"
          >
            + Add New Option
          </Button>
        </div>

        {/* Apply changes */}
        <Button
          onClick={applyChanges}
          className="w-full mt-4 bg-green-500 text-white cursor-pointer"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
