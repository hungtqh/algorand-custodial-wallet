import ReactLoading from "react-loading";

type Props = {
  fullScreen?: boolean;
};

export default function Loading({ fullScreen }: Props) {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${
        fullScreen ? "absolute top-0 left-0 bg-white" : ""
      } `}
    >
      <ReactLoading
        type={"balls"}
        color={"#3CA5E9"}
        width={"10%"}
        height={"10%"}
      />
    </div>
  );
}
