import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLazyGetComment } from "~/entities/Comments";
import { Button, ButtonTheme } from "~/shared/ui/Button/Button";
import { Comment } from "~/widgets/Comment";

import s from "./Detail.module.scss";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trigger, { data, isLoading, isSuccess }, lastPromiseInfo] =
    useLazyGetComment();

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (!isLoading && !isSuccess) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Button
        className={s.backBtn}
        theme={ButtonTheme.SECONDARY}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {data && <Comment data={data} />}
    </div>
  );
};

export default Detail;
