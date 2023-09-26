import { useOutletContext } from "react-router-dom";

import { OutletProps } from "~/shared/types/mainOutletProps";
import { Comment } from "~/widgets/Comment";

interface RawProps {
  className?: string;
}

export const Raw = ({ className }: RawProps) => {
  const { commentsList, isLoading } = useOutletContext<OutletProps>();

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      {commentsList?.apiResponse?.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
};
