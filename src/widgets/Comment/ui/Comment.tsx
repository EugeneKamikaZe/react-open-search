import classNames from "classnames";

import { CommentsSchema } from "~/entities/Comments";

import s from "./Comment.module.scss";

interface CommentProps {
  className?: string;
  data: CommentsSchema;
}

export const Comment = ({ className, data }: CommentProps) => {
  const { id, postId, name, body, email } = data;

  return (
    <div className={classNames(s.Comment, {}, [className])}>
      <p>postId:</p>
      <p>{postId}</p>

      <p>id:</p>
      <p>{id}</p>

      <p>name: </p>
      <p>{name}</p>

      <p>email: </p>
      <p>{email}</p>

      <p>body: </p>
      <p>{body}</p>
    </div>
  );
};
