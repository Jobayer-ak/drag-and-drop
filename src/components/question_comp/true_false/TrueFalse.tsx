'use client';

import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ComponentNameProps } from '../../../types/types';
import { Badge } from '../../ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

const TrueFalse: React.FC<ComponentNameProps> = ({ uid }) => {
  const options = ['True', 'False'];
  return (
    <div className="" id="true_false">
      <Card className="border border-gray-200 rounded-lg py-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-5">
            <div className="cursor-move">
              <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
            </div>
            True or False Question
          </CardTitle>
          <CardAction>
            <div className="flex justify-end items-center gap-2">
              <FiCopy className="h-5 w-5 text-gray-400 cursor-pointer" />
              <RiDeleteBinLine className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <RadioGroup defaultValue="" className="px-1 text-gray-400">
            {options.map((option, index) => {
              const id = `${uid}-option-${index}`;
              return (
                <div key={id} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={option.toLowerCase()}
                    id={id}
                    className="border border-gray-400"
                  />
                  <Label htmlFor={id}>{option}</Label>
                </div>
              );
            })}
          </RadioGroup>

          <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
        </CardContent>

        <CardFooter className="pb-2 pt-0">
          <Badge className="bg-blue-700 text-white text-xs">
            True/False 1 Point
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TrueFalse;
