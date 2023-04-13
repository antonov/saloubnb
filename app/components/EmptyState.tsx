'use client';
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = (
  {
    title = "No exact matches",
    subtitle= "Try changing or removing some of your filters",
    showReset
  }) => {
  const router = useRouter();
  return (
    <div className="
      h-[60vh]
      flex
      flex-col
      gap-2
      items-center
      justify-center
    ">
      <Heading title={title} subtitle={subtitle} center />

      {showReset && (
        <div className="w-48 mt-4">
        <Button
          outline
          label="Remove all filters"
          onClick={() => {
            router.push('')
          }}
        />
        </div>
      )}
    </div>
  )
}

export default EmptyState;