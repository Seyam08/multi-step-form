import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { JSX } from "react";

export default function NextPrev(): JSX.Element {
  return (
    <div className="flex justify-between my-5">
      <Button variant="outline" size="sm" className="uppercase">
        <ChevronLeftIcon /> prev
      </Button>
      <Button variant="outline" size="sm" className="uppercase">
        <ChevronRightIcon /> next
      </Button>
    </div>
  );
}
