interface IIconProps {
  src: string;
  className?: string;
}

const Icon = ({ src, className }: IIconProps) => {
  return <img alt="" className={`${className} h-10 w-10`} src={src} />;
};

export default Icon;
