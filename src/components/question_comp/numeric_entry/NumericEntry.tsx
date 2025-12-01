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
import { Input } from '../../ui/input';

const NumericEntry: React.FC<ComponentNameProps> = ({ uid }) => {
  const inputId = `${uid}-numeric-input`; // unique id for input

  return (
    <Card className="border border-gray-200 rounded-lg py-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-5">
          <div className="cursor-move">
            <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
          </div>
          Numerical Entry Question
        </CardTitle>

        <CardAction>
          <div className="flex justify-end items-center gap-2">
            <FiCopy className="h-5 w-5 text-gray-400 cursor-pointer" />
            <RiDeleteBinLine className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="text-gray-700">
        <Input
          id={inputId}
          type="text"
          placeholder="Write your answer here"
          className="border-none focus-visible:outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
      </CardContent>

      <CardFooter className="pb-2 pt-0">
        <Badge className="bg-blue-700 text-white text-xs">
          Numerical Entry 2 Points
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default NumericEntry;
