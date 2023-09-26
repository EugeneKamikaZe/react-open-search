import React, {
  JSXElementConstructor,
  PropsWithChildren,
  ReactNode,
} from "react";

interface ComposeProvidersProps {
  components: Array<JSXElementConstructor<PropsWithChildren>>;
  children: ReactNode;
}
const ComposeProviders = (props: ComposeProvidersProps) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight(
        (acc, Component) => (
          <Component>{acc}</Component>
        ),
        children,
      )}
    </>
  );
};

export default ComposeProviders;
