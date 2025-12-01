'use client';

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
  return (
    <div className="">
      <Card className="border border-gray-200 rounded-lg py-2">
        <CardHeader className="">
          <CardTitle className="flex flex-start items-center gap-5">
            <div>
              <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
            </div>
            Multiple Select Question
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
          <CardAction>
            <div className="flex justify-end items-center gap-2">
              <FiCopy className="h-5 w-5 text-gray-400" />
              <RiDeleteBinLine className="h-5 w-5 text-gray-400" />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="">
          {/* <p>Card Content</p> */}
          <div className="flex flex-col gap-4 text-gray-400 px-1.5">
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Option 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Option 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Option 3</Label>
            </div>
          </div>
          <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
        </CardContent>
        {/* <div className="px-7 py-0">
          <Separator className="my-4 px-7 py-0 bg-gray-300" />
        </div> */}
        <CardFooter className="pb-2 pt-0">
          <Badge className="bg-blue-700 text-white text-xs">
            Multipple Select 2 Points
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};
