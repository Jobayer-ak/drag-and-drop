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
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

const TrueFalse = () => {
  return (
    <div className="" id="true_false">
      <Card className="border border-gray-200 rounded-lg py-2">
        <CardHeader className="">
          <CardTitle className="flex flex-start items-center gap-5">
            <div>
              <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
            </div>
            True or False Question
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
          <RadioGroup defaultValue="comfortable" className="px-1 text-gray-400">
            <div className="flex items-center gap-3 ">
              <RadioGroupItem
                value="true"
                id="r1"
                className="border border-gray-400"
              />
              <Label htmlFor="r1">True</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="false"
                id="r2"
                className="border border-gray-400"
              />
              <Label htmlFor="r2">False</Label>
            </div>
          </RadioGroup>

          {/* <div className="bg-amber-500 px-10 mt-6 py-0">
            <Separator className="my-4 py-0 bg-gray-300" />
          </div> */}

          <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
        </CardContent>
        {/* <div className="px-7 py-0">
          <Separator className="my-4 px-7 py-0 bg-gray-300" />
        </div> */}
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
