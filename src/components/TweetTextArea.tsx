import React, {
  ComponentPropsWithRef,
  FC,
  forwardRef,
  use,
  useState,
} from "react";

//fix:このままだとedit pageでは使用できなそう
const TweetTextArea: FC<
  ComponentPropsWithRef<"textarea"> & { children: string }
> = forwardRef(({ className, children, ...props }, ref) => {
  const [tweetLength, setTweetLength] = useState<number>(children.length);
  return (
    <div>
      <textarea
        {...props}
        ref={ref}
        rows={10}
        cols={80}
        className={`border border-gray-300 rounded-lg p-2 resize-none ${className}`}
        onChange={(e) => {
          setTweetLength(e.target.value.length);
        }}
      >
        {children}
      </textarea>
      <div className={tweetLength > 140 ? "text-red-500" : ""}>
        {tweetLength}/140
      </div>
    </div>
  );
});

export default TweetTextArea;
