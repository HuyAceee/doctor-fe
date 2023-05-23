import AuthProvider from "./AuthContext";

interface Props {
  children: JSX.Element;
}

const ContextProvider = (props: Props) => {
  const { children } = props;
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProvider;
