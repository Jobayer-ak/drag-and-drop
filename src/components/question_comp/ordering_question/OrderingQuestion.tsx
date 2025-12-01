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

const OrderingQuestion = () => {
  return (
    <div className="">
      <Card className="border border-gray-200 rounded-lg py-2">
        <CardHeader className="">
          <CardTitle className="flex flex-start items-center gap-5">
            <div>
              <MdOutlineDragIndicator className="h-6 w-6 text-gray-400" />
            </div>
            Ordering Question
          </CardTitle>

          <CardAction>
            <div className="flex justify-end items-center gap-2">
              <FiCopy className="h-5 w-5 text-gray-400" />
              <RiDeleteBinLine className="h-5 w-5 text-gray-400" />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="text-gray-700">
          {/* options card */}

          <div className="flex flex-col gap-2">
            <div className="ms-1  px-2 border border-gray-200 rounded-sm py-1">
              <div className="flex flex-start items-center gap-3 text-gray-400 py-1">
                <div>
                  <MdOutlineDragIndicator className="h-4 w-4 text-gray-400" />
                </div>
                <span
                  className="flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-500 
              text-xs font-medium rounded-full"
                >
                  1
                </span>

                <p className="text-sm">Option 1</p>
              </div>
            </div>

            <div className="ms-1  px-2 border border-gray-200 rounded-sm py-1">
              <div className="flex flex-start items-center gap-3 text-gray-400 py-1">
                <div>
                  <MdOutlineDragIndicator className="h-4 w-4 text-gray-400" />
                </div>
                <span
                  className="flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-500 
              text-xs font-medium rounded-full"
                >
                  2
                </span>

                <p className="text-sm">Option 2</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full mt-4 mx-1 bg-gray-300"></div>
        </CardContent>
        {/* <div className="px-7 py-0">
          <Separator className="my-4 px-7 py-0 bg-gray-300" />
        </div> */}
        <CardFooter className="pb-2 pt-0">
          <Badge className="bg-blue-700 text-white text-xs">
            Ordering 3 Points
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderingQuestion;
