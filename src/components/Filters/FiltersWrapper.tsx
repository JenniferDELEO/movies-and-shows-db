import { ReactNode } from "react";

const FiltersWrapper = ({ children }: { children: ReactNode }) => (
  <div className="col-span-1 mx-auto h-fit w-full rounded-small border border-default-200 px-6 py-4">
    {children}
  </div>
);

export default FiltersWrapper;
