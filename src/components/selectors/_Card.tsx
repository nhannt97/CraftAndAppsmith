import { Container, ContainerSettings } from "./Container";
import { Text } from "./Text";
import { Button } from "./Button";
import { Element, useNode, UserComponent } from "@craftjs/core";

export const CardTop: UserComponent = ({ children }) => {
  const {
    connectors: { connect }
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="text-only"
      style={{ padding: 5, border: "1px dashed #ccc" }}
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Text)
  }
};

export const CardBottom: UserComponent = ({ children }) => {
  const {
    connectors: { connect }
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="text-only"
      style={{ padding: 5, border: "1px dashed #ccc" }}
    >
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button)
  }
};

export interface CardProps {
  background: string;
  padding: number;
}

export const Card: UserComponent<CardProps> = ({
  background,
  padding = 20
}) => {
  return (
    <Container background={background} padding={padding}>
      <Element is={CardTop} id="text" canvas>
        <Text text="Title" size={20} />
        <Text text="Subtitle" size={15} />
      </Element>
      <Element is={CardBottom} id="buttons" canvas>
        <Button size="small" variant="contained" color="primary">
          Learn more
        </Button>
      </Element>
    </Container>
  );
};

Card.defaultProps = {
  background: "white", // or any other default color
  padding: 10 // or any other default padding value
};

Card.craft = {
  related: {
    settings: ContainerSettings
  }
};
