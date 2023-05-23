import "./index.css";

interface ILoadingProps {
  className?: string;
}

const Loading = ({ className = "" }: ILoadingProps) => {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
};

export default Loading;
