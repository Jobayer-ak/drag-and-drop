'use client';

import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Badge } from '../../ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';

export const MultipleSelect = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleChange = (optionId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  return (
    <div>
      <Card className="border border-gray-200 rounded-lg py-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-5">
            <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
            Multiple Select Question
          </CardTitle>
          <CardAction>
            <div className="flex justify-end items-center gap-2">
              <FiCopy className="h-5 w-5 text-gray-400" />
              <RiDeleteBinLine className="h-5 w-5 text-gray-400" />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 text-gray-400 px-1.5">
            {options.map((option, index) => {
              // Unique deterministic ID per option
              const id = `multiple-select-${index}`;
              return (
                <div key={id} className="flex items-center gap-3">
                  <Checkbox
                    id={id}
                    checked={!!checkedItems[id]}
                    onCheckedChange={() => handleChange(id)}
                  />
                  <Label htmlFor={id}>{option}</Label>
                </div>
              );
            })}
          </div>
          <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
        </CardContent>

        <CardFooter className="pb-2 pt-0">
          <Badge className="bg-blue-700 text-white text-xs">
            Multiple Select 2 Points
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};
