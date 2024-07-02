"use client";

type Props = {
  btnText: string;
  handler: (postId: string) => {};
  postId: string;
};

export default function Button({ btnText, handler, postId }: Props) {
  return <button onClick={() => handler(postId)}>{btnText}</button>;
}
